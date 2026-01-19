package chap05;

import java.util.Scanner;

public class Ref_01 {

	public static void main(String[] args) {
		
		int a = 10;
		int b = a;
		System.out.println(a + ", " + b); // 10, 10
		
		b = 12;
		System.out.println(a + ", " + b); // 10, 12
		
		
		String name = "홍세정";
		// = 오른쪽이 먼저 실행됨
		// "홍세정"을 heap 영역에 할당하고 번지 획득
		// heap 영역의 번지를 stack 영역의 변수 name에 저장함
		
		System.out.println(name);
		// name이 가리키는 번지의 값을 가져옴
		
		System.out.println(a == b);
		// ==, != 는 무조건 stack의 값을 비교함
		
		String name2 = new String ("홍세정"); // 무조건 새로운 heap 영역에 할당, stack 영역에 새 번지 저장
		System.out.println(name2);
		
		System.out.println(name == name2); // false : stack 영역에 저장된 번지가 다름
		System.out.println(name.equals(name2)); // true : heap 영역 안의 내용을 비교
		
		String name3 = "홍세정";
		System.out.println(name == name3); // true : 스트링의 경우에만 값이 같으면 번지를 재활용
		// 오류 나기 딱 좋으니까 무조건 equals 써서 비교
		
		String name4 = "홍"+"세정";
		System.out.println(name == name4); // true
		// heap 영역에 "홍"이 먼저 생성, "세정"이 생성됨
		// 두 개를 더한 결과, "홍세정" 생성됨
		// 결과가 마침 name의 번지에 저장되어 있기에, 주소 재활용함
		// 중간 단계에 생성되는 것들이 많기 때문에, 효율적이지 못함
		
		
		String name5 = name;
		System.out.println(name == name5); // 무조건 true : name5에 name의 stack 저장
		
		System.out.println("name5: " + name5);
		name = "다른 거";
		System.out.println("afterName: " + name); // 다른 거
		System.out.println("afterName5: " + name5); // 홍세정
		//String만 특별 케이스 : 기존의 name의 stack을 분리하여 name5에 두고, name만 stack이 변경
		System.out.println(name == name5); // false : stack 주소 바뀜
		
		
		System.out.println("--- null ---");
		
		
//		int c = null; // 기본 타입은 null 넣을 수 없음
		
		// null : 참조하는 주소가 없는 상태.
		// 즉, 참조 타입(String) 등에는 들어갈 수 있음
		String addr = "천안";
		System.out.println("addr == null: " + (addr == null)); // false
		System.out.println("addr != null: " + (addr != null)); // true
		
		String addr2 = ""; // 없는 값이 들어가 있는 거지, 주소가 없는 상태는 아님
		System.out.println("addr2 == null: " + (addr2 == null)); // false : addr2는 null 아님
		System.out.println("addr2 != null: " + (addr2 != null)); // true
		
		addr = null;
		// "천안"과 연결이 끊어지고,
		// "천안"은 ㅊ마조하고 있는 변수가 없어지므로
		// garbage collector(gc)가 정리
		System.out.println("addr: " + addr);
		// 출력할 때만, null 이라는 글씨로 바뀜
		System.out.println("addr == null: " + (addr == null)); // false
		System.out.println("addr != null: " + (addr != null)); // true
		
		// NullPointerException 발생 : addr이 null 이므로 실행 시, 오류 발생
//		if (addr.equals(addr2)) {
//			System.out.println("같다");
//		}
		// addr2는 null이 아니므로, 실행 가능
		System.out.println(addr2.equals(addr)); // false
		
		if (addr != null) { // 방어 코딩
			System.out.println(addr.equals(addr2));
		} else {
			System.out.println("addr == null");
		}
		
		// 비교 전략
		// 1.
//		if (addr.equals("천안")) {
//			// addr이 null일 수 있음. 방어코딩 필요함
//		}
		
		if ("천안".equals(addr)) {
			// "천안"은 절대 null이 아니므로, 방어코딩이 필요하지 않아짐
		}
		
		
		

	} // end
} // end
