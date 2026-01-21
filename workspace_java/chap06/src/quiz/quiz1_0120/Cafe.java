package quiz.quiz1_0120;

import java.util.ArrayList;

public class Cafe {
	
	String name;
	int money;
	ArrayList<String> menus = new ArrayList<>();
	
	String setName (String name) {
		this.name = name;
		return this.name;
	}
	String getName () {
		return this.name;
	}
	
	int setMoney (int money) {
		this.money = money;
		return this.money;
	}
	int getMoney () {
		return this.money;
	}
	
	void menus () {
		menus.add("아이스 아메리카노");
		menus.add("따뜻한 아메리카노");
	}
	
	void runCafe () {
		
		System.out.println("카페이름: " + getName());
		System.out.println("자본금: " + getMoney());
		System.out.println();
		System.out.println("<메뉴>");
		
		for (int i=0; i<menus.size(); i++) {
			System.out.println(menus.get(i));
		}
		
	}
	
	
	
	
}
