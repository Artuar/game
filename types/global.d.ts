/** Global definitions for development **/

// for style loader
declare module '*.css' {
  const classes: { [key: string]: string };
  export = classes;
}
