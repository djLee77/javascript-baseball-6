import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  constructor() {
    //생성자 생성 - 게임 초기화
    //(게임이 진행중인지의 상태와 랜덤으로 생성할 정답을 담을 인스턴스 멤버들을 초기화)
    this.answer = [];
    this.isGameRunning = true;
  }

  async play() {
    //입력을 받을때까지 기다린 후 받은 입력 값으로 실행해야 하니 함수명에 async 키워드 사용,
    // 후에 입력 받는 로직에 await 키워드 사용
    while (this.isGameRunning) {
      this.generateAnswer();
      MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");

      let result;
      while (result !== "3스트라이크") {
        const input = await MissionUtils.Console.readLineAsync(
          "숫자를 입력해 해주세요 : "
        );
        if (
          //사용자로부터의 입력 처리
          input.length !== 3 ||
          new Set(input) !== 3 ||
          [...input].some((item) => Number(item) < 1 || Number(item) > 9)
        ) {
          throw new Error("Error - 잘못된 값을 입력하셨습니다.");
        }

        result = this.checkTarget(input); // checkTarget 메소드는 판정결과를 return한다 ex) "3스트라이크"
      }
    }
  }

  generateAnswer() {
    //랜덤한 정답을 생성하는 함수
    this.answer = []; // 객체가 생성될 때 뿐만 아니라 사용자가 게임을 다시 시작할때도 정답을 다시 만들어줘야한다.
    while (this.answer.length < 3) {
      const randoms = MissionUtils.Random.pickNumberInRange(1, 9);
      if (this.answer.includes(randoms)) this.answer.push(randoms); //중복 검사
    }
  }

  checkTarget(target) {
    //스트라이크, 볼, 낫싱 판정 메소드, 판정결과를 return해야 한다. ex) "3스트라이크"
  }
}

export default App;
