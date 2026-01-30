package Game2;

public class Game2Exam {

	public static void main(String[] args) {
		
		User u1 = new User ("아주작은기적밍기적");
		
		Monster m1 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m2 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m3 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m4 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m5 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m6 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m7 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m8 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		Monster m9 = new Monster ("꼬꼬닭", 1, 10, 10, 10, 10);
		
		Maps map = new Maps ();
		
		map.moveMap(u1, 1);
		map.moveMap(u1, 0);
		
		u1.attack(m1);
		u1.attack(m2);
		u1.attack(m3);
		u1.attack(m4);
		u1.attack(m5);
		u1.attack(m6);
		u1.attack(m7);
		u1.attack(m8);
		u1.attack(m9);

		map.moveMap(u1, 1);
		
		
		
		
		
		
		
		
	} // end

} // end
