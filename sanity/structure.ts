import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Asistencias')
    .items([
      S.documentTypeListItem('employee').title('Empleados'),
      S.documentTypeListItem('attendance').title('Asistencias'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['attendance', 'employee'].includes(item.getId()!),
      ),
    ])
