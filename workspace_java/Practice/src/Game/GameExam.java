package Game;

public class GameExam {

	public static void main(String[] args) {
		
		/** 문제 15 (게임)
		 * 포켓몬 골드
		 * 
		 * 리그 (리그명 필수)
		 * 참가 포켓몬 수 4마리
		 * 참가 (전달인자 포켓몬)
		 * 포켓몬 - 공격력 수치, 방어 수치, 체력
		 *  - 내가 10의 공격력이고 저쪽의 방어력이 4면 : 공격 시 6의 체력 감소
		 *  - 체력 수치, 공격력, 방어력, 이름 필드
		 * 배틀 (메소드) 에서 1번-2번 배틀 (전달인자로 포켓몬 2마리)
		 *  - 한 쪽의 체력이 0이 될 때까지
		 *  - 체력이 0이 된 쪽이 lose
		 *  - 공격은 턴제
		 */
		
		Pocketmon a = new Pocketmon("a", 20, 6, 20);
		Pocketmon b = new Pocketmon("b", 16, 8, 18);
		Pocketmon c = new Pocketmon("c", 20, 6, 23);
		Pocketmon d = new Pocketmon("d", 14, 7, 15);
		
		League l1 = new League("빨리 끝내자");
		
		l1.gameStart(a, b, c, d);
		
	}

}
