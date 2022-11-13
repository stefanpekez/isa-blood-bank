package com.example.isabloodbank.service;
import com.example.isabloodbank.dto.CenterDTO;
import com.example.isabloodbank.mapper.CenterMapper;
import com.example.isabloodbank.model.Address;
import com.example.isabloodbank.model.Center;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.repository.IAddressRepository;
import com.example.isabloodbank.repository.ICenterRepository;
import com.example.isabloodbank.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CenterService implements ICenterService {

    @Autowired
    ICenterRepository centerRepository;

    @Autowired
    private CenterMapper centerMapper;

    @Autowired
    private IAddressRepository addressRepository;

    @Autowired
    private UserService userService;

    @Override
    public List<Center> getAll() {
        return centerRepository.findAll();
    }

    @Override
    public List<Center> getAll(String sortBy, String sortOrder) {
        List<Center> centers = centerRepository.findAll();
        centers.sort((c1, c2) -> {
            int order;
            if (sortOrder.equals("asc")) {
                order = 1;
            } else {
                order = -1;
            }

            return switch (sortBy) {
                case "name" -> c1.getName().compareTo(c2.getName()) * order;
                case "city" -> c1.getAddress().getTown().compareTo(c2.getAddress().getTown()) * order;
                default -> c1.getRating().compareTo(c2.getRating()) * order;
            };
        });

        return centers;
    }

    public CenterDTO create(@RequestBody CenterDTO centerDTO) throws Exception {
        Center center = centerMapper.dtoToEntity(centerDTO);

        List<Address> addresses = addressRepository.findAll();
        List<User> admins = new ArrayList<>();

        User admin = center.getAdminsCenter().get(0);
        if (userService.findUserByEmail(admin.getEmail()).isPresent()) {
            admin = userService.findUserByEmail(admin.getEmail()).get();
        }

        Address centerAddress = addressInRepo(addresses, center.getAddress());
        if (centerAddress != null)
            center.setAddress(centerAddress);

        if (centerRepository.findCenterByAddressId(center.getAddress().getId()).isPresent())
            throw new Exception("Center located on that address already exists");

        Address adminAddress = addressInRepo(addresses, admin.getAddress());
        if (adminAddress != null)
            admin.setAddress(adminAddress);

        admins.add(admin);
        center.setAdminsCenter(admins);

        center = centerRepository.save(center);
        admin.setCenterId(center.getId());
        userService.create(admin);
        return centerMapper.entityToDto(center);
    }
    public Center getById(Long id) {
        Optional<Center> center = centerRepository.findById(id);
        if(center.isEmpty()) {
            return null;
        }
        return center.get();
    }
    public Center edit(Center center, Long id){
        Optional<Center> OldCenter = centerRepository.findById(id);     //provjeravam da li postoji u bazi
        if(OldCenter.isEmpty()) {
            return null;
        }
        return centerRepository.save(center);
    }

    private Address addressInRepo(List<Address> addresses, Address address) {
        for (Address a: addresses) {
            if (!a.getStreetName().equals(address.getStreetName()))
                continue;
            if (!a.getStreetNumber().equals(address.getStreetNumber()))
                continue;
            if (!a.getTown().equals(address.getTown()))
                continue;
            if (!a.getCountry().equals(address.getCountry()))
                continue;
            return a;
        }
        return null;
    }
}
