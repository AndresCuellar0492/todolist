export class Task {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean,
    public categoryId: string | null = null // Puede ser nulo si no tiene categoría asignada
  ) {}
}
