package chap05;

import java.util.ArrayList;

public class ArrayListExam_05 {

	public static void main(String[] args) {
		
		String[] menu = new String[3];
		menu[0] = "아아";
		menu[1] = "딸기라떼";
		menu[2] = "따뜻한 아이스티";
		
		// 딸기 치즈케이크 스무디 를 추가하고 싶음!!
		// 총 4개를 출력
		
		String[] menu2 = new String[menu.length+1];

		for (int i=0; i<menu.length; i++) {
			menu2[i] = menu[i];
		}
		menu2[menu2.length-1] = "딸기치즈케이크스무디";
		
		for (String s : menu2) {
			System.out.println(s);
		}
		
		
		ArrayList list = new ArrayList(); // ctrl + shift + o || import
		
		// 추가하는 방법. 추가한 순서대로 저장하고 있음
		list.add("1"); // 변수로 된 모든 것 가능, 배열도 넣기 가능!
		list.add("글씨");
		list.add(true);
		
		// 사용 (가지고 오는 방법)
		System.out.println(list.get(0)); // 0번부터 시작 // 1
		System.out.println(list.get(1)); // "글씨"
		System.out.println(list.get(2)); // true
		
		// 크기
		System.out.println(list.size());
		
		System.out.println(list); // [1, 글씨, true]
		
		for (int i=0; i<list.size(); i++) {
			System.out.println(list.get(i));
		}
		
		
		// <String>은 generic : String 타입만 넣는다
		ArrayList<String> list2 = new ArrayList();
		list2.add("첫번째");
		list2.add("두번째");
		list2.add("세번째");
		
		// 향상된 for문은 타입이 모두 1개거나, 자동 형변환 되는 것들만
		for (String s : list2) {
			System.out.println(s);
		}
		
		
		// 뭐 넣을지 안 정함!
		ArrayList list3 = new ArrayList();
		list3.add(1);
		list3.add(2);
		
//		int a = (int)list3.get(0); // 뽑을 때 형 변환 가능!
	
	
	} // end

} // end
