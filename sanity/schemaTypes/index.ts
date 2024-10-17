import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import employeeType from './employeeType'
import attendanceType from './attendanceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, employeeType, attendanceType],
}
