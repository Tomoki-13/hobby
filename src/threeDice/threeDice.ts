import * as readline from 'readline';
import {judgeHand} from "./utils/judgeHand";
import {compareHands} from "./utils/compareHands";

//入力処理
const getInput = (message: string): Promise<string> =>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(message, (input) => {
            rl.close();
            if (input === 'keep' ||input === 'again') {
                resolve(input);
            } else {
                console.log("Invalid input. Please enter 'keep' or 'again'");
                getInput(message).then(resolve); 
            }
        });
    });
}

(async () => {
    try {
        const getRandomInt = (max: number) => Math.floor(Math.random() * max);

        let userDiceArray:number[] = [];
        let enemyDiceArray:number[] = [];
        let userHand:string = '';
        let enemyHand:string = '';
        let status:string = '';
        let rollNum = 3;

        while(status !== 'keep' && rollNum !== 0 && userHand != 'saikorogakoboreta'){
            for(let i = 0;i < 3;i++){
                userDiceArray[i] = getRandomInt(6)+1;
            }
            console.log('Your Dice Num:' + userDiceArray[0] + ' ' + userDiceArray[1] + ' ' + userDiceArray[2]);
            userHand = judgeHand(userDiceArray,getRandomInt(100)+1);
            console.log('Your Hand:'+userHand);
            if(enemyHand !== 'saikorogakoboreta' || rollNum > 0){
                if(status === 'again'){
                    rollNum--;
                }
                status = await getInput("You can reroll the dice "+ rollNum + " more times. Enter 'keep' or 'again': ");
            }
        }
        console.log();
        status = '';
        rollNum = 3;
        while(status !== 'keep' && rollNum !== 0 && enemyHand != 'saikorogakoboreta'){
            for(let i = 0;i < 3;i++){
                enemyDiceArray[i] = getRandomInt(6)+1;
            }
            console.log('Enemy Dice Num:'+enemyDiceArray[0] + ' ' + enemyDiceArray[1] + ' ' + enemyDiceArray[2]);
            enemyHand = judgeHand(enemyDiceArray,getRandomInt(100)+1);
            console.log('Enemy Hand:'+enemyHand);
            if(enemyHand !== 'saikorogakoboreta' || rollNum > 0){
                let judge:string = compareHands(enemyHand,'yakunasi');
                if(judge !== 'You win'){
                    console.log('again');
                    rollNum--;
                } else {
                    console.log('keep');
                }
            }
        }
        console.log();
        console.log('Your Hand:'+userHand);
        console.log('Enemy Hand:'+enemyHand);
        console.log(compareHands(userHand,enemyHand));
    } catch  (error: any) {
        console.error("エラー:", error.message);
    }
})();