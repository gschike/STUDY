package quiz.quiz1_0120;

public class Room {
	
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
	
	int roomNo;
	int max;
	boolean pet;
	boolean barbecue;
	boolean reservation;
	
	Room (int roomNo, int max, boolean pet, boolean barbecue) {
		this.roomNo = roomNo;
		this.max = max;
		this.pet = pet;
		this.barbecue = barbecue;
		this.reservation = true;
	}
	
	boolean book (Room room) {
		this.reservation = false;
		return this.reservation;
	}
	
	void checkBook (Room room) {
		if (this.reservation) {
			System.out.println(room.roomNo + "번 방: 예약 가능");
		} else {
			System.out.println(room.roomNo + "번 방: 예약 불가능");
		}
	}
	
	/** 문제 14-1
	 * 시작일, 종료일로 예약 가능하도록
	 */
	
}
