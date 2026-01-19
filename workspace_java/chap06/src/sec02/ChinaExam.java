package sec02;

public class ChinaExam {

	public static void main(String[] args) {
		
		System.out.println("===========================");
		China china1 = new China();
		System.out.println("이름: " + china1.name);
		System.out.println("주소: " + china1.address);
		System.out.println();
		System.out.println("---- 메뉴판 ----");
		for (int i=0; i<china1.menus.size(); i++) {
			System.out.print(china1.menus.get(i) + "  ");
			System.out.println(china1.prices.get(i));
		}
		System.out.println("----------------");
		
		System.out.println("===========================");
		
		china1.name = "용선생 천안점";
		china1.address = "천안시 대흥동";
		
		china1.menus.add("쟁반짜장");
		china1.menus.add("해물짬뽕");
		china1.menus.add("볶음밥");
		
		china1.prices.add(14000);
		china1.prices.add(10000);
		china1.prices.add(10000);
		
		System.out.println("이름: " + china1.name);
		System.out.println("주소: " + china1.address);
		System.out.println();
		System.out.println("---- 메뉴판 ----");
		for (int i=0; i<china1.menus.size(); i++) {
			System.out.print(china1.menus.get(i) + "  ");
			System.out.println(china1.prices.get(i));
		}
		System.out.println("----------------");
		
		System.out.println("===========================");
		
		China china2 = new China();
		System.out.println("이름: " + china2.name);
		System.out.println("주소: " + china2.address);
		System.out.println();
		System.out.println("---- 메뉴판 ----");
		for (int i=0; i<china1.menus.size(); i++) {
			System.out.print(china1.menus.get(i) + "  ");
			System.out.println(china1.prices.get(i));
		}
		System.out.println("----------------");
		
		System.out.println("===========================");
		
		china2.name = "용선생 청주점";
		china2.address = "청주시 금천동";
		
		china2.menus.add("짜장");
		china2.menus.add("짬뽕");
		china2.menus.add("볶음밥");
		
		china2.prices.add(7000);
		china2.prices.add(8000);
		china2.prices.add(10000);
		
		System.out.println("이름: " + china2.name);
		System.out.println("주소: " + china2.address);
		System.out.println();
		System.out.println("---- 메뉴판 ----");
		for (int i=0; i<china2.menus.size(); i++) {
			System.out.print(china2.menus.get(i) + "  ");
			System.out.println(china2.prices.get(i));
		}
		System.out.println("----------------");
		
		System.out.println("===========================");
		
	} // end

} // end
