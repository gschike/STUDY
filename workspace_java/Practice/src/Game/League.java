package Game;

public class League {
	
	/** 문제 15 (게임)
	 * 포켓몬 골드
	 * 
	 * 참가 포켓몬 수 4마리
	 * 참가 (전달인자 포켓몬)
	 * 포켓몬 - 공격력 수치, 방어 수치, 체력
	 *  - 내가 10의 공격력이고 저쪽의 방어력이 4면 : 공격 시 6의 체력 감소
	 *  - 체력 수치, 공격력, 방어력, 이름 필드
	 * 배틀 (메소드) 에서 1번-2번 배틀 (전달인자로 포켓몬 2마리)
	 *  - 한 쪽의 체력이 0이 될 때까지
	 *  - 체력이 0이 된 쪽이 lose
	 *  - 공격은 턴제
	 *
	 * 
	 * 
	 * 리그 (리그명 필수)
	 */
	
	String lName;
	
	Pocketmon w1;
	Pocketmon w2;
	
	
	
	League (String lName) {
		this.lName = lName;
	}
	
	
	
	void gameStart (Pocketmon p1, Pocketmon p2, Pocketmon p3, Pocketmon p4) {
		System.out.println(this.lName + " 리그의 게임이 시작됩니다");
		System.out.printf("참가 포켓몬: %s,  %s,  %s,  %s", p1.pName, p2.pName, p3.pName, p4.pName);
		System.out.println();
		
		// p1 vs p2
		boolean first = false;
		System.out.println();
		System.out.println("======== " + p1.pName + " vs " + p2.pName + " ========");
		
		while (first == false) {
			System.out.println(p1.pName + " 공격!");
			System.out.println((p1.atk - p2.def) + "만큼의 공격이 들어갔습니다");
			p2.hp -= (p1.atk - p2.def);
			
			if (p2.hp<=0) {
				System.out.println(p2.pName + "의 hp: 0");
				System.out.println();
				System.out.println(p2.pName + "(이)가 전투 불능 상태가 되었습니다");
				first = true;
				break;
			} else {
				System.out.println(p2.pName + "의 hp: " + p2.hp);
			}
			System.out.println();
			
			System.out.println(p2.pName + " 공격!");
			System.out.println((p2.atk - p1.def) + "만큼의 공격이 들어갔습니다");
			p1.hp -= (p2.atk - p1.def);

			if (p1.hp<=0) {
				System.out.println(p1.pName + "의 hp: 0");
				System.out.println();
				System.out.println(p1.pName + "(이)가 전투 불능 상태가 되었습니다");
				first = true;
				break;
			} else {
				System.out.println(p1.pName + "의 hp: " + p1.hp);
			}
			System.out.println();
		}
		
		System.out.println();
		System.out.println("경기가 종료되었습니다!");
		
		if (p1.hp <= 0) {
			System.out.println("승자: " + p2.pName);
			w1 = p2;
		} else {
			System.out.println("승자: " + p1.pName);
			w1 = p1;
		}
		
		
		
		// p3 vs p4
		boolean second = false;
		System.out.println();
		System.out.println("======== " + p3.pName + " vs " + p4.pName + " ========");
		
		while (second == false) {
			System.out.println(p3.pName + " 공격!");
			System.out.println((p3.atk - p4.def) + "만큼의 공격이 들어갔습니다");
			p4.hp -= (p3.atk - p4.def);
			
			if (p4.hp<=0) {
				System.out.println(p4.pName + "의 hp: 0");
				System.out.println();
				System.out.println(p4.pName + "(이)가 전투 불능 상태가 되었습니다");
				second = true;
				break;
			} else {
				System.out.println(p4.pName + "의 hp: " + p4.hp);
			}
			System.out.println();
			
			System.out.println(p4.pName + " 공격!");
			System.out.println((p4.atk - p3.def) + "만큼의 공격이 들어갔습니다");
			p3.hp -= (p4.atk - p3.def);
			
			if (p3.hp<=0) {
				System.out.println(p3.pName + "의 hp: 0");
				System.out.println();
				System.out.println(p3.pName + "(이)가 전투 불능 상태가 되었습니다");
				second = true;
				break;
			} else {
				System.out.println(p3.pName + "의 hp: " + p3.hp);
			}
			System.out.println();
		}
		
		System.out.println();
		System.out.println("경기가 종료되었습니다!");
		
		if (p3.hp <= 0) {
			System.out.println("승자: " + p4.pName);
			w2 = p4;
		} else {
			System.out.println("승자: " + p3.pName);
			w2 = p3;
		}
		
		
		// w1 vs w2
		w1.hp = w1.hpOrg;
		w2.hp = w2.hpOrg;
		boolean third = false;
		System.out.println();
		System.out.println("======== " + w1.pName + " vs " + w2.pName + " ========");
		
		while (third == false) {
			System.out.println(w1.pName + " 공격!");
			System.out.println((w1.atk - w2.def) + "만큼의 공격이 들어갔습니다");
			w2.hp -= (w1.atk - w2.def);
			
			if (w2.hp<=0) {
				System.out.println(w2.pName + "의 hp: 0");
				System.out.println();
				System.out.println(w2.pName + "(이)가 전투 불능 상태가 되었습니다");
				third = true;
				break;
			} else {
				System.out.println(w2.pName + "의 hp: " + w2.hp);
			}
			System.out.println();
			
			System.out.println(w2.pName + " 공격!");
			System.out.println((w2.atk - w1.def) + "만큼의 공격이 들어갔습니다");
			w1.hp -= (w2.atk - w1.def);
			
			if (w1.hp<=0) {
				System.out.println(w1.pName + "의 hp: 0");
				System.out.println();
				System.out.println(w1.pName + "(이)가 전투 불능 상태가 되었습니다");
				third = true;
				break;
			} else {
				System.out.println(w1.pName + "의 hp: " + w1.hp);
			}
			System.out.println();
		}
		
		System.out.println();
		System.out.println("경기가 종료되었습니다!");

	}
	
}
