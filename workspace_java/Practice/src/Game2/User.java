package Game2;

public class User {
	
	/** User
	 * 이름, 레벨, 공격력, 방어력, 체력, 경험치, 현재 위치
	 */
	
	String name;
	int level = 1; // level
	double atk = 15*(1 + 0.5*level); // 공격력
	double def = 8*(1 + 0.5*level); // 방어력
	int hp = 20*level; // 체력
	int exp = 0; // 경험치
	int expMax = 100*level;
	int mapIndex = 0; // 현재 위치
	
	
	User (String name) {
		this.name = name;
	}
	
	void attack (Monster mon) {
		boolean flag = false;
		
		while (this.hp > 0 && mon.mHP >0) {
			
			System.out.println(mon.mName + "을(를) 공격했다");
			double attack = (double)this.atk - mon.mDef;
			
			if (this.atk >= mon.mDef) {
				mon.mHP -= attack;
				System.out.println(attack);
			} else {
				System.out.println("공격이 효과가 없다");
			}
			
			if (mon.mHP <= 0) {
				System.out.println();
				System.out.println(mon.mName + "이 쓰러졌다");
				System.out.println(mon.mExp + "만큼의 경험치 획득");
				this.exp += mon.mExp;
				System.out.println();
				flag = true;
				break;
			}
			
			System.out.println();
			
			System.out.println(mon.mName + "이(가) 반격한다");
			double mAttack; 
			
			if (mon.mAtk >= this.def) {
				mAttack= mon.mAtk - this.def;
				this.hp -= mAttack;
			} else {
				mAttack= 0;
			}
			System.out.println(mAttack + "만큼 피해를 입었다");
			
			if (this.hp <= 0) {
				System.out.println();
				System.out.println(mon.mName + "에 의해 사망");
				System.out.println();
				flag = true;
				break;
			}
			System.out.println();
		} // while
		
		if (this.exp >= this.expMax) {
			System.out.println("레벨 업!");
			this.level++;
			System.out.println("레벨 " + this.level);
			this.exp -= this.expMax;
			System.out.println();
		}
		
		this.hp = 20;
	} // attack
	
	
}
