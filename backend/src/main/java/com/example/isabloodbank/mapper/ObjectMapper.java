package com.example.isabloodbank.mapper;

public interface ObjectMapper<Entity, Dto> {

    Dto entityToDto(Entity entity);

    Entity dtoToEntity(Dto dto);
}
