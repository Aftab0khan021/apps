import { type SchemaTypeDefinition } from 'sanity';

import { personalInfo } from './schemas/personalInfo';
import { experience } from './schemas/experience';
import { project } from './schemas/project';
import { skill } from './schemas/skill';
import { certification } from './schemas/certification';
import { education } from './schemas/education';
import { contactMessage } from './schemas/contactMessage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    personalInfo,
    experience,
    project,
    skill,
    certification,
    education,
    contactMessage,
  ],
};