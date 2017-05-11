package com.cc.data.line;

public class LineList {

	public int getElem(SqList l, int i) {
		if (l.length == 0 || i < 0 || i > l.length - 1) {
			return -1;
		} else {
			return l.data[i];
		}
	}

	public int insert(SqList l, int i, int e) {
		if (l.length == SqList.MAX_LENGTH) {
			return -1;
		}
		if (i < 0 || i > l.length + 1) {
			return -1;
		}

		if (i == 0) {
			l.data[i] = e;
		} else if (i <= l.length) {
			for (int k = l.length; k >= i - 1; k--) {
				l.data[k + 1] = l.data[k];
			}

		}
		l.data[i] = e;
		l.length++;
		return 0;
	}

	public int delete(SqList l, int i) {
		if (l.length == 0) {
			return -1;
		}
		if (i < 0 || i > l.length - 1) {
			return -1;
		}
		if (i == l.length) {
			l.data[i] = 0;
		} else {
			for (int k = i; k < l.length - 1; k++) {
				l.data[k] = l.data[k + 1];
			}
		}
		l.length--;
		return 0;

	}

	public boolean isEmpty(SqList l) {
		return l.length == 0;
	}

	public int clear(SqList l) {
		l.data = new int[SqList.MAX_LENGTH];
		l.length = 0;
		return 0;
	}

	public int getElemIndex(SqList l, int e) {
		if (l.length == 0) {
			return -1;
		}

		for (int k = 0; k < l.length; k++) {
			if (l.data[k] == e) {
				return k;
			}
		}
		return -1;
	}

	public int size(SqList l) {
		return l.length;
	}
}
