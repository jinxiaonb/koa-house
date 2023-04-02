import '@/index.scss';


const heading = document.createElement('h1');
heading.textContent = 'Hello, First!';

document.body.appendChild(heading);


async function test(){
     await test3();
}

function test3(){
    console.log('test3');
}

test();
