package com.gato.backend.service;

import java.util.List;


import com.gato.backend.model.Window;

public interface IWindowService {

    List<Window> getWindows();

    Window getSingleWindow(String windowId);

    Window saveWindow(Window window);

    void deleteWindow(String windowId);

}
