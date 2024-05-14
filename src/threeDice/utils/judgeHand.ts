//役の判定処理
export const judgeHand =(dice: number[],randomNum:Number): string => {
    if(randomNum===99||randomNum===100){
        return 'saikorrogakoboreta'
    }
    if(dice[0]===dice[1]||dice[1]===dice[2]||dice[2]===dice[0]){
        //ゾロ目
        if(dice[0]===dice[1]&&dice[1]===dice[2]){
            if(dice[0]===1){
                return 'pinsoro';
            }else{
                console.log('zorome'+dice[0]);
                return 'zorome'+dice[0];
            }
        } else {
            //2つの目が揃っている場合
            if(dice[0]===dice[1]){
                return dice[2].toString();
            }else if(dice[1]===dice[2]){
                return dice[0].toString();
            }else if(dice[0]===dice[2]){
                return dice[1].toString();
            }
        }
    }else{
        //456と123,役なし
        const sortedDice = dice.slice().sort((a, b) => a - b); 
        if((sortedDice[0] === 1 && sortedDice[1] === 2 && sortedDice[2] === 3)){
            return 'hihumi';
        }else if((sortedDice[0] === 4 && sortedDice[1] === 5 && sortedDice[2] === 6)){
            return 'sigoro';
        }else{
            return 'yakunasi'
        }
    }
    return 'yakunasi';
}