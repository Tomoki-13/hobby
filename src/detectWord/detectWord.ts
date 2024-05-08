import * as readline from 'readline';
const dic: string[] = [
    "apple", "banana", "carrot", "dog", "elephant", 
    "fish", "giraffe", "horse", "iguana", "jellyfish",
    "kangaroo", "lion", "monkey", "noodle", "orange",
    "pear", "quail", "rabbit", "snake", "tiger"
];

const getInputFromConsole = (message: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question(message, (answer) => {
            rl.close();
            const isAlphabetic = /^[a-zA-Z]+$/.test(answer);
            if (!isAlphabetic) {
                console.log("半角のアルファベット以外を入力しないでください");
                getInputFromConsole("半角のアルファベットを入力してください:").then(resolve).catch(reject);
            } else {
                resolve(answer);
            }
        });
    });
}
const getAnswer = (): string => {
    const getRandomInt = (max: number) => Math.floor(Math.random() * max);
    const num: number = getRandomInt(dic.length);
    return dic[num];
}

const hideAnser = (answer: string): string => {
    let word: string = '';
    for(let i=0;i<answer.length;i++){
        word = word + '-';
    }
    return word;
}

const replace = (answer: string,word: string,input:string): string => {
    let i = 0;
    const charactersArray = word.split("");
    while(i < answer.length){
        if(input == answer[i]){
            charactersArray[i] = input;
        }
        i++;
    }
    word = charactersArray.join("");
    return word;
}

const check = (answer: string,word: string,input:string): boolean =>{
    let i = 0;
    while(i < answer.length){
        if(input == answer[i]){
            return true;
        }
        i++;
    }
    return false;
}


(async () => {
    try {
        const answer: string = getAnswer();
        let life:number = 7;
        let word = hideAnser(answer);
        while(word!=answer && life != 0){
            console.log(word);
            console.log('life:'+life);
            const input: string = await getInputFromConsole("半角アルファベットを入力してください:");
            console.log(input); 
            if(check(answer,word,input)){
                word = replace(answer,word,input);
            }else{
                life--;
            }
        }
        if(word==answer){
            console.log(word + 'が正解です');
        }else if(life == 0){
            console.log('lifeが０になりました');
            console.log('ゲームオーバーです');
        }
    } catch  (error: any) {
        console.error("エラー:", error.message);
    }
})();