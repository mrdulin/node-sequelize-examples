import { MyLib } from './MyLib';

export class MyClass {
  myLib;
  constructor() {
    this.myLib = new MyLib();
  }

  myMainMethod = (param) => {
    this.myLib.firstMethod((arg) => {
      this.myLib.secondMethod(arg);
    });
  };
}
