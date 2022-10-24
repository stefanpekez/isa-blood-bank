package com.example.isabloodbank.model.enums;

public enum BloodType {
    A,
    B,
    AB,
    O;

    private boolean isPositive;

    BloodType() {
        this.isPositive = false;
    }

    public void setIsPositive(boolean isPositive) {
        this.isPositive = isPositive;
    }
}
