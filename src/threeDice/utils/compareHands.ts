//役の強弱判定
export const compareHands = (playerHand: string, enemyHand: string): string => {
    const hands = ['pinsoro', 'zorome', 'sigoro', '6', '5', '4', '3', '2', '1', 'yakunasi', 'saikorogakoboreta', 'hihumi'];
    const playerRank = hands.indexOf(playerHand);
    const opponentRank = hands.indexOf(enemyHand);

    if (playerRank === opponentRank) {
        return 'Draw';
    } else if (playerRank < opponentRank) {
        return 'You win';
    } else {
        return 'You lose';
    }
}