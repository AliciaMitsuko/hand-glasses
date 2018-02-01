// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,

  mapbox: {
      accessToken: 'pk.eyJ1Ijoib3JhbnRob255IiwiYSI6IlNaeGI5WHcifQ.WrKVVuOwRR0aGSzVtR6I5w'
  }
};

// export enum gravEnum{
//   'INDEMNE', 'TUE', 'HOSPITALISE', 'LEGER'
// }

export enum userRoleEnum{
  'CLIENT', 'ADMIN'
}

