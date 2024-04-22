//study1をタイプスクリプトで書いた場合
import * as readline from 'readline';

function getInputNumberFromConsole(message: string): Promise<number> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question(message, (answer) => {
            rl.close();
            const number = parseFloat(answer);
            if (isNaN(number) || number > 2) {
                console.error("入力された値が0,1,2以外の文字です。もう一度入力してください。");
                getInputNumberFromConsole("あなたの手は:").then(resolve).catch(reject);
            } else {
                resolve(number);
            }
        });
    });
}

const determineWinner = (enemy: number, user: number, vicNum: number[]): number[] => {
    if (enemy === user) {
        vicNum[0] = vicNum[0] + 1;
        console.log('あいこ');
        console.log('あなたの勝ち数:' + vicNum[2] + ', あいての勝ち数' + vicNum[1]);
        return vicNum;
    } else if ((enemy === 1 && user === 2) || (enemy === 0 && user === 1) || (enemy === 3 && user === 0)) {
        vicNum[0] = vicNum[0] + 1;
        vicNum[1] = vicNum[1] + 1;
        console.log('あなたの負け');
        console.log('あなたの勝ち数:' + vicNum[2] + ', あいての勝ち数' + vicNum[1]);
        return vicNum;
    } else if ((user === 1 && enemy === 2) || (user === 0 && enemy === 1) || (user === 3 && enemy === 0)) {
        vicNum[0] = vicNum[0] + 1;
        vicNum[2] = vicNum[2] + 1;
        console.log('あなたの勝ち');
        console.log('あなたの勝ち数:' + vicNum[2] + ', あいての勝ち数' + vicNum[1]);
        return vicNum;
    }
    return vicNum;
}

(async () => {
    try {
        let vicNum: number[] = [1, 0, 0];
        while (vicNum[1] < 3 && vicNum[2] < 3) {
            const getRandomInt = (max: number) => Math.floor(Math.random() * max);
            const enemy: number = getRandomInt(3);
            console.log(vicNum[0] + "戦目");
            console.log("0:チョキ 1:パー 2:グー");
            const user: number = await getInputNumberFromConsole("あなたの手は:");
            vicNum = determineWinner(enemy, user, vicNum);
        }
        if (vicNum[1] == 3) {
            console.log('相手が先に３勝したので，あなたの負け');
        } else if (vicNum[2] == 3) {
            console.log('先に３勝したので，あなたの勝ち');
        }
    } catch  (error: any) {
        console.error("エラー:", error.message);
    }
})();