class Key {
    constructor(private signature: number = Math.random()) {}

    getSignature(): number {
        return this.signature;
    }
}

class Person {
    constructor(private key: Key) {}

    getKey(): Key {
        return this.key;
    }
}

abstract class House {
    protected door: boolean = false;
    protected tenants: Person[] = [];

    constructor(protected key: Key) {}

    public comeIn(person: Person): void {
        if (this.door) {
            this.tenants.push(person);
            this.door = false;
            console.log(`${person.getKey().getSignature()} зайшов до будинку.`);
        } else {
            console.log(
                `${person
                    .getKey()
                    .getSignature()} 🚫 Двері зачинені. Неможливо увійти.`
            );
        }
    }

    abstract openDoor(key: Key): void;
}

class MyHouse extends House {
    public openDoor(key: Key): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
        }
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

const newKey = new Key();
const newPerson = new Person(newKey);
house.openDoor(newPerson.getKey());
house.comeIn(newPerson);

export {};
