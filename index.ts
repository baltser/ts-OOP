class Person {
    public firstName ='';
    public lastName = '';
    private age = 0;

    protected sayHello(): string {
        return `My name is ${this.firstName} ${this.lastName}`;
    }
}

class Employee extends Person {
    department = '';

    reviewPerformance(): void {
        this.sayHello();
        this.increasePay(5);
    }

    increasePay(percent: number): void {
        // this.
    }
}
////////////// многословная запись объявления класса
// class Person {
//   public firstName ='';
//   public lastName = '';
//   private age = 0;

//   constructor(firstName: string, lastName: string, age: number) {
//       this.firstName = firstName;
//       this.lastName = lastName;
//       this.age = age;
//   }
// }
////////////  Более сжатая версия
class Person1 {
  constructor(public firstName: string, public lastName: string, private age: number) {}

}
const pers = new Person1('John', 'Smith', 29)

console.log(`${pers.firstName} ${pers.lastName}`);  /*${pers.age}*/
