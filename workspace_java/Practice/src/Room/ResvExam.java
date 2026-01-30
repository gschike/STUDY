package Room;

public class ResvExam {

	public static void main(String[] args) {
		
		Room[] roomList = { // 최대인원, 동물, 바베큐
				new Room(4, false, true),
				new Room(2, true, false),
				new Room(8, false, true)
		};
		
		Reservation resv = new Reservation();
		resv.reservation(roomList[0], 1, 5);
		resv.reservation(roomList[0], 1, 31);
		resv.reservation(roomList[0], 3, 7);
		resv.reservation(roomList[0], 7, 27);
		resv.reservation(roomList[0], 7, 2);
		resv.reservation(roomList[0], 17, 20);
		
		resv.resvCheck(roomList[0]);
		
		
	} // method

} // field
