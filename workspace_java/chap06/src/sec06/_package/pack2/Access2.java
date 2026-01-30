package sec06._package.pack2;

public class Access2 {

	// private: 내 클래스 한정
	private int hp = 100;

	
	public Access2() {
		System.out.println("Access2 생성자 실행");
		this.hp = 200; // private: 같은 클래스 내에는 사용 가능
	}	
	
	int d1 = 10;
	public int p1 = 20;
	
	void d() {
		System.out.println("default 메소드 실행");
	}
	public void p() {
		System.out.println("public 메소드 실행");
	}
	
	
}
