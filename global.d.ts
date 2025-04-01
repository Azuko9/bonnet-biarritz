// global.d.ts
declare global {
  // Ajoute une propriété "mongoose" à l'objet global
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: any;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

export {};
