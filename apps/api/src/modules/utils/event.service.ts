// import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';

// @Injectable()
// export class EventsService {
//   constructor(private eventEmitter: EventEmitter2) {
//     // console.log('initing event service');
//   }

//   on(event: string, callback: (data: any) => void) {
//     // console.log('event service on', event);
//     this.eventEmitter.on(event, callback);
//   }

//   async emit(event: string, data: any) {
//     // console.log('event service emit', event);
//     return this.eventEmitter.emit(event, data);
//   }

//   async waitFor(event: string) {
//     return new Promise((resolve) => {
//       this.eventEmitter.once(event, (data) => {
//         resolve(data);
//       });
//     });
//   }
// }
