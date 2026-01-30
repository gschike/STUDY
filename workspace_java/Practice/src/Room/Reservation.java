package Room;

public class Reservation {
	
	/** 문제 14-1
	 * 시작일, 종료일로 예약 가능하도록
	 * 
	 *  규칙:
	 *  - 방은 하루에 한 번만 예약 가능
	 *  - 시작일, 종료일로 예약 가능
	 *   - 1 ~ 10일 간 예약 가능
	 *  - 지정 날짜로 예약
	 */
	
	void reservation (Room room, int start, int finish) {
		
		if (start<0 || finish>=room.date.length) {
			System.out.println("날짜를 다시 선택해주세요");
			System.out.println();
		} else if ((finish-start) > 10) {
			System.out.println("10일 이상 예약 불가능합니다");
			System.out.println();
		} else if (start > finish) {
			System.out.println("예약 시작일이 예약 종료일보다 더 빨라야합니다");
			System.out.println();
		} else {

			boolean flag = false;
			for (int j=start-1; j<finish && flag == false; j++) {
				if (room.date[j] == true) {
					flag = true; // 예약 됐으면 플래그 트루, 확인 멈춤
				}
			} // 예약 됐는지 안 됐는지 확인
			
			if (flag == true) { // 예약 되었으면 예약 불가
				System.out.println("이미 예약된 날짜입니다");
				System.out.println();
			} else { // 예약 안됐으면 예약 가능
				for (int i=start-1; i<finish; i++) {
					room.date[i] = true;
				} // 예약 for
				System.out.println(start + "일부터 " + finish + "일까지 예약이 완료 되었습니다");
				System.out.println();
			} // flag if
		
		} // if
	
	} // reservation end
	
	void resvCheck (Room room) {
		System.out.println("=== <예약 현황> ===");
		for (int i=0; i<room.date.length; i++) {
			System.out.print(i+1 + "일: ");
			if (room.date[i] == true) {
				System.out.println("예약 완료");
			} else {
				System.out.println("가능");
			}
		}
		
	}
	
	
	
	
} // end
