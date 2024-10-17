import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export default defineType({
  name: "attendance",
  title: "Asistencia",
  icon: CalendarIcon,
  type: "document",
  fields: [
    defineField({
      name: "employee",
      title: "Empleado",
      type: "reference",
      to: [{ type: "employee" }],
      validation: (Rule) => Rule.required().error("El empleado es requerido."),
      description: "Empleado que está marcando la asistencia.",
    }),
    defineField({
      name: "checkInTime",
      title: "Hora de entrada",
      type: "datetime",
      description:
        "Fecha y hora en que el empleado marcó la asistencia. Este campo puede quedar vacío si el empleado está de permiso.",
    }),
    defineField({
      name: "shift",
      title: "Turno",
      type: "string",
      options: {
        list: [
          { title: "Mañana", value: "morning" },
          { title: "Tarde", value: "afternoon" },
        ],
      },
      validation: (Rule) => Rule.required().error("El turno es requerido."),
      description: "Turno de la asistencia o permiso.",
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "A tiempo", value: "on-time" },
          { title: "Tarde", value: "late" },
          { title: "Permiso", value: "permission" },
          { title: "Salida a campo", value: "field-trip" },
        ],
      },
      validation: (Rule) => Rule.required().error("El estado es requerido."),
      description:
        "Estado de la asistencia: a tiempo, tarde, permiso o salida a campo.",
    }),
    defineField({
      name: "permissionDetails",
      title: "Detalles del Permiso",
      type: "text",
      hidden: ({ document }) => document?.status !== "permission",
      description:
        'Detalles del permiso si el empleado solicitó uno. Este campo es visible solo si el estado es "Permiso".',
    }),
    defineField({
      name: 'associationVisit',
      title: 'Asociación Visitada',
      type: 'string',
      options: {
        list: [
          { title: "Asociación 1", value: "association-1" },
          { title: "Asociación 2", value: "association-2" },
          { title: "Asociación 3", value: "association-3" },
          { title: "Asociación 4", value: "association-4" },
        ],
      },
      hidden: ({ document }) => document?.status !== 'field-trip',
      validation: (Rule) => Rule.required().error("La asociación es requerida."),
      description: 'Selecciona la asociación que se visita. Este campo es visible solo si el estado es "Salida a campo".',
    }),
    
  ],

  preview: {
    select: {
      title: "employee.name",
      subtitle: "status",
      media: 'employee.mainImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: `${title}`,
        subtitle:
          subtitle === "permission"
            ? "Permiso"
            : subtitle === "on-time"
              ? "A tiempo"
              : subtitle === "field-trip"
                ? "Salida a campo"
                : "Tarde",
        media,
      };
    },
  },
});
