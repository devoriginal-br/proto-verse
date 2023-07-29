const sayHello = (name: string) => {
  const possibleHellos: string[] = ['Hello', 'Hi', 'Hey', 'Yo'];

  const hello =
    possibleHellos[Math.floor(Math.random() * possibleHellos.length)];

  return `${hello}, ${name}`;
};

const message = sayHello('Kevin');
console.log(message);
