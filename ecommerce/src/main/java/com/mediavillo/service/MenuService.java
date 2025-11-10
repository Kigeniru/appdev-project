package com.mediavillo.service;

import com.mediavillo.model.Menu;

import java.util.List;

public interface MenuService {
    List<Menu> getMenus();
    Menu create(Menu menu);
}
