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

/* паттерн проектирования "Одиночка"*************************/
class Gangsta {
  static totalBullets = 100;

  shoot() {
    Gangsta.totalBullets--;
    console.log(`[G]Bullets left: ${Gangsta.totalBullets}`);
  }
}
const g1 = new Gangsta();
g1.shoot(); // prints 99

const g2 = new Gangsta()
g2.shoot(); // prints` 98
// Статические члены класса не используются подклассами! Если создать подкласс SuperGangsta, то он полулчит свою совсвенную копию св-ва totalBullets
class SuperGangsta extends Gangsta {
  shootMany() {
      SuperGangsta.totalBullets--;
      SuperGangsta.totalBullets--;
      console.log(`[SG] Bullets left: ${SuperGangsta.totalBullets}`);
  }
}
const sg = new SuperGangsta();

sg.shootMany(); // prints 96
sg.shoot();     // prints 97
/************************************* */
class AppState {
  counter = 0;
  private static instanceRef: AppState;

  private constructor () {}
  static getInstance(): AppState {
    if (AppState.instanceRef === undefined) {
      AppState.instanceRef = new AppState();
    }
    return AppState.instanceRef;
  }
}
// const appState = new AppState(); // ошибка из-за private construction
const appState1 = AppState.getInstance();
const appState2 = AppState.getInstance();
appState1.counter++; //модифицирует counter мы используем две ссылочные переменные
appState1.counter++;
appState2.counter++;
appState2.counter++;

console.log(appState1.counter); // 4
console.log(appState2.counter); // 4

/********************* Method "Super" ******/
class PersonS {
    constructor(public firstName: string,
                public lastName: string,
                private age: number) {}
                sellStock(symbol: string, numberOfShares: number){
                  console.log(`Selling ${numberOfShares} of ${symbol}`)
                }
}
class EmployeeS extends PersonS {
    constructor(firstName: string, lastName: string, age: number, public departmen: string) {
      super(firstName, lastName, age);
    }
    sellStock(symbol: string, shares: number){
      super.sellStock(symbol, shares);

      this.reportToCompliance(symbol, shares)
    }
    private reportToCompliance(symbol: string, shares: number) {
      console.log(`${this.lastName} from ${this.departmen} sold ${shares} shares of ${symbol}`)
    }
}
const empl = new EmployeeS('Joe', 'Smith', 29, 'Accounting');
empl.sellStock('IBM', 100)
console.log('***************************')
//С помощью ключевого слова super мы повторно использовали функциональность из метода, объявленного в суперклассе, и, помимо этого, добавили новую.
/**********************             Абстрактные классы             ****************** */
abstract class PersonA {
  constructor(public name: string) {};
  changeAddress(newAddress: string) {
    console.log(`Changing address to ${newAddress}`);
  }
  giveDayOff() { 
      console.log(`Giving a day off to ${this.name}`);
  }
  promote(percent: number){
    this.giveDayOff();
    this.increasePay(percent);
  }
  abstract increasePay(percent: number): void;
}

class EmployeeA extends PersonA {
    increasePay(percent: number){
      console.log(`Increasing the salary of ${this.name} by ${percent}%`);
    }
}
class Contractor extends PersonA {
  increasePay(percent: number) {
    console.log(`Increasing the hourly rate of ${this.name} by ${percent}%`);
  }
}
const workers: PersonA[] = [];
workers[0] = new EmployeeA('John');
workers[1] = new Contractor('Mary');

workers.forEach(worker => worker.promote(5))
/*****************    Перегрузка метода             *****************/

class ProductService_ {
  getProducts() {
    console.log(`Get all products`);
  }
  getProducts(id: number) {     //error
    console.log(`Getting the products info for ${id}`)
  }
}
const prodService_ = new ProductService_();

prodService_.getProducts(123);    //  Getting the products info for 123
prodService_.getProducts();       //  Getting the products info for undefined

console.log('**** Корректный синтаксис для перезагрузки методов ****')

interface Product {
  id: number;
  description: string;
}

class ProductService_1 {

    getProducts(description: string): Product[];    // объявляем допустимую сигнатуру метода 
    getProducts(id: number): Product;               // объявляем допустимую сигнатуру метода/*можно опустить. они помогают IDE представить лучшие варианты для подстановки*/
    getProducts(product: number | string): Product[] | Product {
        if  (typeof product === "number") {
          console.log(`Getting the product info for id ${product}`);    // Getting the product info for id 345
                    return { id: product, description: 'great product' };
        } else if (typeof product === "string")  { 
          console.log(`Getting product with description ${product}`);   //Getting product with description blue jeans
          return [{ id: 123, description: 'blue jeans' },
                  { id: 789, description: 'blue jeans' }];
        } else {
        return { id: -1, description: 'Error: getProducts() accept only number or string as args' };
        }   
    }
}
const prodService = new ProductService_1();

console.log(prodService.getProducts(345));           // {...}
console.log(prodService.getProducts('blue jeans'));  // [{...},{...}]
//Перезагрузка конструкторов
class Product_ {
  id: number;
  description: string;

  constructor();
  constructor(id: number);
  constructor(id: number, description: string);
  constructor(id?: number, description?: string){
        //.........
  }
}
//Один конструктор с опциональным аргументом
interface ProductProperties {
  id?: number;
  decription?: string;
}
class ProductsI {
  id: number;
  description: string;
  constructor(properties?: ProductProperties){
        //.........
  }
}
// Надо прислушиваться к сдравому смыслу. Потому что логика может стать непонятной. В TS редком спользуют перегрузка методов!

/*****************  Работа с интерфейсами   ****************** */
 // Еслии вам нужен пользователький тип ключающий конструктор, ипользуйте класс; в противном случае используйте интерфейс!
 interface MotorVihecle {
 startEngine(): boolean;
 stopEngine(): boolean;
 brake(): boolean;
 accelerate(speed: number): void;
 honk(howLong: number): void;
 }

 class Car implements MotorVihecle {
  startEngine(): boolean {
    return true;
  }
  stopEngine(): boolean {
    return true;
  }
  brake(): boolean {
    return true;
  }
  accelerate(speed: number): void {
    console.log(`Driving faster`)
  }
  honk(howLong: number): void{
    console.log(`Beep beep yeah!`)
  }
 }
const car /*: Car | MotorVigecle */ = new Car();
car.startEngine();
///////////////////////

interface Flyable {
  fly(howHigh: number);
  land();
}
interface Swimmable {
  swim(howFar: number);
}
// class SecretServiceCar implements MotorVihecle, Flyable, Swimmable {
//   // Реализовать все методы из трех интерфейсов
// } 
// class SecretServiceCar extends Car implements Flyable, Swimmable {
//   //   // Реализовать все методы из двух интерфейсов
//   } 

////////////Расширение интерфейсов
interface Flyable extends MotorVihecle {
  fly(wohHigh: number);
  land();
}
class SecretServiceCar implements  Flyable, Swimmable {
  startEngine(): boolean {           //  MotorVihecle
    return true;
  }
  stopEngine(): boolean {
    return true;
  }
  brake(): boolean {
    return true;
  }
  accelerate(speed: number): void {
    console.log(`Driving faster`)
  }
  honk(howLong: number): void{
    console.log(`Beep beep yeah!`)
  }
  fly(howHigh: number){                       //Flyable
    console.log(`Flying ${howHigh} feet high`)
  }
  land(){
    console.log(`Landing. Fasten your belts.`)
  }
  swim(howFar: number) {                    //Swimmable
    console.log(`Swimming ${howFar} feet.`)
  }
} 
/////////////////// Программирование через интрфейсы
interface Product {
  id: number;
  description: string;
}

interface IProductService {
  getProductService(): Product[];
  getProductById(id: number): Product;
}

class ProductService implements IProductService {
  getProductService(): Product[] {
    //Здесь должен находиться код для получения информации
    // о продуктах из реального источника данных.
    return[];
  }
  getProductById (id: number): Product {
        //здесь идет код для получения продукта по Id.
        return { id: 123, description: 'Good product!'}
  }
}
class MockProductService implements IProductService {
  // Здесь идет другая конкретная реализация методов интерфейса
}
function getProductService(isProduction: boolean): IProductService { // фабричная функция, использующая в качестве возвращаемого типа интерфейса
  if (isProduction) {
    return new ProductService();
  } else {
    return new MockProductService
  }
}
// const productService: IProductService; // константа, имеющая тип интерфейса
//.....
const isProd = true; // В реальном приложении это не кодировалось жестко

