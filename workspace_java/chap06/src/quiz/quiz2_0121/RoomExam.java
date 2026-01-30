package quiz.quiz2_0121;

public class RoomExam {

	public static void main(String[] args) {

		
		/** 문제 14 (펜션 예약 관리)
		 * 여러 개의 방이 있음
		 * 방에는
		 *  - 최대인원, 반려동물 여부, 바베큐장 여부
		 *  
		 *  규칙:
		 *  - 방은 하루에 한 번만 예약 가능
		 *  - 시작일, 종료일로 예약 가능
		 *   - 1 ~ 10일 간 예약 가능
		 *  - 지정 날짜로 예약
		 */
		
		Room[] roomList = {
			new Room (1, 4, true, true),	
			new Room (2, 2, true, false),	
			new Room (3, 4, false, true),	
			new Room (4, 8, false, true)
		};
		
		roomList[1].book(roomList[1]);
		
		for (int i=0; i<roomList.length; i++) {
			roomList[i].checkBook(roomList[i]);
		}
		
		
		/** 문제 14-1
		 * 시작일, 종료일로 예약 가능하도록
		 * 
		 *  규칙:
		 *  - 방은 하루에 한 번만 예약 가능
		 *  - 시작일, 종료일로 예약 가능
		 *   - 1 ~ 10일 간 예약 가능
		 *  - 지정 날짜로 예약
		 */

	} // method

} // field
