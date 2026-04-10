// async = function has slow operations
// await = wait for this to finish

async function maketea(){
    console.log('1-boiling water..');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('2-adding tea bag...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('3- adding milk...');
    console.log('4- tea ready!');
}

maketea();
