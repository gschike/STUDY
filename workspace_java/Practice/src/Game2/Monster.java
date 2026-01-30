package Game2;

public class Monster {
	
	String mName;
	int mLev;
	double mAtk;
	double mDef;
	double mHP;
	double mExp;
	
	Monster (String mName, int mLev, int mAtk, int mDef, int mHP, int mExp) {
		this.mName = mName;
		this.mLev = mLev;
		this.mAtk = mAtk + 0.25*mLev;
		this.mDef = mDef + 0.25*mLev;
		this.mHP = mHP + 0.25*mLev;
		this.mExp = mExp + 0.25*mExp;
	}
	
	
	
}
