package Room;

public class Room {
	
	/** 문제 14 (펜션 예약 관리)
	 * 여러 개의 방이 있음
	 * 방에는
	 *  - 최대인원, 반려동물 여부, 바베큐장 여부
	 */
	
	/** 문제 14-1
	 * 시작일, 종료일로 예약 가능하도록
	 * 
	 *  규칙:
	 *  - 방은 하루에 한 번만 예약 가능
	 *  - 시작일, 종료일로 예약 가능
	 *   - 1 ~ 10일 간 예약 가능
	 *  - 지정 날짜로 예약
	 */
	
	int max;
	boolean pet;
	boolean barbecue;
	boolean[] date = new boolean[30];
	
//	boolean[] Jan = new boolean[31];
//	boolean[] Feb = new boolean[28];
//	boolean[] Mar = new boolean[31];
//	boolean[] Apr = new boolean[30];
//	boolean[] May = new boolean[31];
//	
//	boolean[][] reservation = {
//		Jan, Feb, Mar, Apr, May	
//	};
//	boolean[][] reservation = {
//			new boolean[31],
//			new boolean[28],
//			new boolean[31],
//			new boolean[30],
//			new boolean[31]
//	};
	
	Room (int max, boolean pet, boolean barbecue) {
		this.max = max;
		this.pet = pet;
		this.barbecue = barbecue;
	}
	

}
