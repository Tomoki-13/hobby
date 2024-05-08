//jsRSPgame.jsをタイプスクリプトで書いた場合一部変更済み
import * as readline from 'readline';

function getInput(message: string): Promise<number> {
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
                getInput("あなたの手は:").then(resolve).catch(reject);
            } else {2
                resolve(number);
            }
        });
    });
}

const determineWinner = (enemy: number, user: number, vicNum: number[]): number[] => {
    if ((user - enemy + 3) % 3 == 0) {
        vicNum[0] = vicNum[0] + 1;
        console.log('あいこ');
        return vicNum;
    } else if ((user - enemy + 3) % 3 == 1) {
        vicNum[0] = vicNum[0] + 1;
        vicNum[1] = vicNum[1] + 1;
        console.log('あなたの負け');
        return vicNum;
    } else if ((user - enemy + 3) % 3 == 2) {
        vicNum[0] = vicNum[0] + 1;
        vicNum[2] = vicNum[2] + 1;
        console.log('あなたの勝ち');
        return vicNum;
    }
    return vicNum;
}

(async () => {
    try {
        let vicNum: number[] = [1, 0, 0];
        while (vicNum[1] < 3 && vicNum[2] < 3) {
            console.log();
            console.log('あなたの勝ち数:' + vicNum[2] + ', あいての勝ち数:' + vicNum[1]);
            const getRandomInt = (max: number) => Math.floor(Math.random() * max);
            const enemy: number = getRandomInt(3);
            console.log(vicNum[0] + "戦目");
            console.log("0:グー 1:チョキ 2:パー");
            const user: number = await getInput("あなたの手は:");
            console.log("あいての手は:" + enemy);

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