const InputList: Input[] = []; // 保存所有的输入映射

(() => {
    document.addEventListener('keydown', (event) => {
        for (const index in InputList) {
            InputList[index].keyStates[event.code] = true;
        }
    });

    document.addEventListener('keyup', (event) => {
        for (const index in InputList) {
            InputList[index].keyStates[event.code] = false;
        }
    });
})();


class Input {
    keyStates: { [key: string]: boolean };
    constructor() {
        this.keyStates = {};
        InputList.push(this);
    }
    distory() {
        InputList.splice(InputList.indexOf(this), 1);
    }
}


export { Input }