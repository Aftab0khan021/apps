import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';

import { schema } from './sanity/schema';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'temp-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio Content')
          .items([
            S.listItem()
              .title('Personal Information')
              .child(
                S.document()
                  .schemaType('personalInfo')
                  .documentId('personal-info')
              ),
            S.divider(),
            S.listItem()
              .title('Work Experience')
              .child(S.documentTypeList('experience').title('Work Experience')),
            S.listItem()
              .title('Projects')
              .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
              .title('Skills')
              .child(S.documentTypeList('skill').title('Skills')),
            S.listItem()
              .title('Certifications')
              .child(S.documentTypeList('certification').title('Certifications')),
            S.listItem()
              .title('Education')
              .child(S.documentTypeList('education').title('Education')),
            S.divider(),
            S.listItem()
              .title('Contact Messages')
              .child(
                S.documentTypeList('contactMessage')
                  .title('Contact Messages')
                  .filter('_type == "contactMessage"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool(),
  ],
  tools: (prev) => {
    // Show only the structure tool and vision tool in production
    if (process.env.NODE_ENV === 'production') {
      return prev.filter((tool) => tool.name !== 'vision');
    }
    return prev;
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== 'personalInfo'
        );
      }
      return prev;
    },
  },
});