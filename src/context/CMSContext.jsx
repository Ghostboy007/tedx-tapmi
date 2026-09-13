import React, { createContext, useEffect, useState } from 'react';
import { INITIAL_CMS_DATA } from '../data/initialData';

export const CMSContext = createContext();

export function CMSProvider({ children }) {
  const [cmsData, setCmsData] = useState(() => {
    // Force loading from initialData.js to ensure updates reflect immediately during development
    return INITIAL_CMS_DATA;
  });
  const [registrationCount, setRegistrationCount] = useState(null);

  useEffect(() => {
    fetch('/api/registrations')
      .then(response => {
        if (!response.ok) throw new Error('Unable to load registration count');
        return response.json();
      })
      .then(({ count }) => setRegistrationCount(count))
      .catch(error => console.error(error));
  }, []);

  const saveCmsData = (newData) => {
    setCmsData(newData);
    try {
      localStorage.setItem('tedx_cms_data', JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save CMS data to localStorage", e);
    }
  };

  const updateHero = (updatedHero) => {
    const newData = {
      ...cmsData,
      hero: { ...cmsData.hero, ...updatedHero }
    };
    saveCmsData(newData);
  };

  const addSpeaker = (newSpeaker) => {
    const speakerWithId = {
      ...newSpeaker,
      id: 'sp-' + Date.now()
    };
    const newData = {
      ...cmsData,
      speakers: [speakerWithId, ...cmsData.speakers]
    };
    saveCmsData(newData);
  };

  const updateSpeaker = (id, updatedFields) => {
    const newData = {
      ...cmsData,
      speakers: cmsData.speakers.map(sp => sp.id === id ? { ...sp, ...updatedFields } : sp)
    };
    saveCmsData(newData);
  };

  const deleteSpeaker = (id) => {
    const newData = {
      ...cmsData,
      speakers: cmsData.speakers.filter(sp => sp.id !== id)
    };
    saveCmsData(newData);
  };

  const addGalleryPhoto = (newPhoto) => {
    const photoWithId = {
      ...newPhoto,
      id: 'gal-' + Date.now()
    };
    const newData = {
      ...cmsData,
      gallery: [photoWithId, ...cmsData.gallery]
    };
    saveCmsData(newData);
  };

  const deleteGalleryPhoto = (id) => {
    const newData = {
      ...cmsData,
      gallery: cmsData.gallery.filter(g => g.id !== id)
    };
    saveCmsData(newData);
  };

  const addRegistration = async (regData) => {
    const response = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regData)
    });

    const result = await response.json();
    if (!response.ok) {
      const error = new Error(result.error || 'Registration failed');
      error.code = result.code;
      throw error;
    }

    setRegistrationCount(result.count);
    setCmsData(currentData => ({
      ...currentData,
      registrations: [result.registration, ...(currentData.registrations || [])]
    }));
    return result.registration;
  };

  const resetToDefaults = () => {
    saveCmsData(INITIAL_CMS_DATA);
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        registrationCount,
        updateHero,
        addSpeaker,
        updateSpeaker,
        deleteSpeaker,
        addGalleryPhoto,
        deleteGalleryPhoto,
        addRegistration,
        resetToDefaults
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}
