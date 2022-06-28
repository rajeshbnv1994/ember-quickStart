import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'ember-quickstart/config/environment';
import { Gantt, ProjectModel } from '@bryntum/gantt';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  constructor() {
    super(...arguments);

    const element = document.getElementById('test');

    const project = new ProjectModel({
      startDate: new Date(2020, 0, 1),

      eventsData: [
        {
          id: 1,
          name: 'Write docs',
          expanded: true,
          children: [
            {
              id: 2,
              name: 'Proof-read docs',
              startDate: '2020-01-02',
              endDate: '2020-01-05',
            },
            {
              id: 3,
              name: 'Release docs',
              startDate: '2020-01-09',
              endDate: '2020-01-10',
            },
          ],
        },
      ],

      dependenciesData: [{ fromEvent: 2, toEvent: 3 }],
    });

    const gantt = new Gantt({
      project,
      appendTo: element,

      startDate: new Date(2019, 11, 31),
      endDate: new Date(2020, 0, 11),

      height: 1000,

      columns: [{ type: 'name', field: 'name', text: 'Name' }],
    });
  }
}

loadInitializers(App, config.modulePrefix);
