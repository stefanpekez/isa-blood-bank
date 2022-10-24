package com.example.isabloodbank.model.enums;

public enum Loyalty {
    REGULAR(0),
    SILVER(3),
    GOLD(5);

    private final int points;

    Loyalty(int points) {
        this.points = points;
    }

    public int getPoints() {
        return this.points;
    }
}
