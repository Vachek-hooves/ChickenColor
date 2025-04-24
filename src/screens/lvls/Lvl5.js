import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomModal from '../../components/CustomModal';
import {useStore} from '../../store/context';
import Orientation from 'react-native-orientation-locker';

const Lvl5 = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [worms, setWorms] = useState([]);
  const [glasses, setGlasses] = useState({red: 0, pink: 0, yellow: 0});
  const [bomb, setBomb] = useState(false);
  const {
    levels,
    setLevels,
    setCurrentIdx,
    setBestTime,
    bestTime,
    inventoryRoosters,
    setBalance,
  } = useStore();
  const [timeLeft, setTimeLeft] = useState(59);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    pauseTimer();
  }, [isVisible]);

  useEffect(() => {
    const startTimer = () => {
      if (!isRunning && timeLeft > 0) {
        setIsRunning(true);
        timerRef.current = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timerRef.current);
              setIsRunning(false);
              return 0; // Stop at 0
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    };
    startTimer();
  }, []);

  // Pause the timer
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // Stop the timer and reset
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(60); // Reset to initial time
  };

  // Generate worms and bombs on interval
  useEffect(() => {
    const interval = setInterval(() => {
      const newWorms = Array.from({length: 5}).map(() => ({
        id: Math.random(),
        color: ['red', 'pink', 'yellow'][Math.floor(Math.random() * 3)],
        isBomb: Math.random() < 0.3, // 20% chance of being a bomb
      }));
      setWorms(newWorms);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCatch = (worm, idx) => {
    if (worm.isBomb) {
      setGlasses({red: 0, blue: 0, yellow: 0});
      setBomb(true);
      setIsVisible(true);
    } else {
      // Add worm to the correct glass

      setGlasses(prevGlasses => ({
        ...prevGlasses,
        [worm.color]:
          prevGlasses[worm.color] <= 5
            ? prevGlasses[worm.color] + 1
            : prevGlasses[worm.color],
      }));
    }
    if (glasses.red === 6 && glasses.pink === 6 && glasses.yellow === 6) {
      pauseTimer();
    }
  };

  const isGameWon = Object.values(glasses).every(count => count >= 6);

  const unlockLevel = () => {
    const unlockLevel = levels.map((level, idx) => {
      if (idx === 4) {
        return {
          ...level,
          passed: true,
          locked: false,
        };
      }
      return level;
    });

    if (bestTime < timeLeft) {
      setBestTime(timeLeft);
    }

    setLevels(unlockLevel);
    stopTimer();
    setBalance(prev => prev + 18);
    setIsVisible(false);
    setCurrentIdx(prev => prev + 1);
    navigation.navigate('Levels');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/gameBg.png')}
      style={{
        ...styles.container,
        filter: isVisible ? 'blur(4)' : null || isGameWon ? 'blur(4)' : null,
      }}>
      <View style={styles.gameContainer}>
        <Image
          source={require('../../../assets/images/bg.png')}
          style={{width: '100%', borderTopRightRadius: 52}}
        />
      </View>

      <View style={styles.containerGlass}>
        <Text style={styles.title}>Fill the glasses</Text>
        <View style={styles.glassesContainer}>
          {['red', 'pink', 'yellow'].map(color => (
            <View key={color}>
              <Image
                source={require('../../../assets/images/glass.png')}
                style={{height: 210}}
              />
              <Image
                source={require('../../../assets/images/RectTop.png')}
                style={{position: 'absolute', bottom: 0, right: 45}}
              />
              <View
                style={[
                  styles.glass,
                  color === 'pink' && {
                    backgroundColor: '#F6B1B1',
                  },
                  color === 'pink' && glasses.pink > 5
                    ? {
                        height: 186,
                      }
                    : {
                        height: 31 * glasses[color],
                      },

                  styles.glass,
                  color === 'yellow' && {
                    backgroundColor: '#F7D22B',
                  },
                  color === 'yellow' && glasses.yellow > 5
                    ? {
                        height: 186,
                      }
                    : {
                        height: 31 * glasses[color],
                      },

                  styles.glass,
                  color === 'red' && {
                    backgroundColor: '#ff6347',
                  },
                  color === 'red' && glasses.red > 5
                    ? {
                        height: 186,
                      }
                    : {
                        height: 31 * glasses[color],
                      },
                ]}></View>
            </View>
          ))}
        </View>

        <Image
          source={require('../../../assets/images/Union.png')}
          style={{width: '65%'}}
        />
        <Image
          source={require('../../../assets/images/RectBot.png')}
          style={{marginBottom: 30}}
        />

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {Math.floor(timeLeft / 60) + '0'}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60} ` : timeLeft % 60}
          </Text>
        </View>

        <View style={styles.holesContainer}>
          {worms.map((worm, idx) => (
            <ImageBackground
              key={worm.id}
              style={[styles.bgHole, idx === 4 && styles.centerWorm]}
              source={require('../../../assets/images/hole.png')}>
              <TouchableOpacity
                key={worm.id}
                onPress={() => handleCatch(worm, idx)}>
                {worm.color === 'red' && (
                  <View>
                    {worm.isBomb ? (
                      bomb ? (
                        <Image
                          source={require('../../../assets/images/explosion.png')}
                          style={styles.bgExp}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/images/bomb.png')}
                          style={{width: 64, height: 64}}
                        />
                      )
                    ) : (
                      <Image
                        source={require('../../../assets/images/red.png')}
                        style={{width: 64, height: 64}}
                      />
                    )}
                  </View>
                )}
                {worm.color === 'pink' && (
                  <View>
                    {worm.isBomb ? (
                      bomb ? (
                        <Image
                          source={require('../../../assets/images/explosion.png')}
                          style={styles.bgExp}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/images/bomb.png')}
                          style={{width: 64, height: 64}}
                        />
                      )
                    ) : (
                      <Image
                        source={require('../../../assets/images/pink.png')}
                        style={{width: 64, height: 64}}
                      />
                    )}
                  </View>
                )}
                {worm.color === 'yellow' && (
                  <View>
                    {worm.isBomb ? (
                      bomb ? (
                        <Image
                          source={require('../../../assets/images/explosion.png')}
                          style={styles.bgExp}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/images/bomb.png')}
                          style={{width: 64, height: 64}}
                        />
                      )
                    ) : (
                      <Image
                        source={require('../../../assets/images/yellow.png')}
                        style={{width: 64, height: 64}}
                      />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            </ImageBackground>
          ))}
        </View>
        <View style={styles.roosterContainer}>
          {inventoryRoosters.length === 0 ? (
            <Image source={require('../../../assets/images/rosster1.png')} />
          ) : (
            <View>
              {inventoryRoosters.map(rooster => {
                if (rooster.selected) {
                  return <Image source={rooster.image} key={rooster.id} />;
                }
              })}
            </View>
          )}
        </View>
      </View>

      {isGameWon && (
        <CustomModal visible={true}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 175,
                height: 175,
                backgroundColor: 'rgba(253, 164, 0, 1)',
                borderRadius: 99,
              }}>
              <Image
                source={require('../../../assets/images/modalRooster.png')}
              />
            </View>

            <Text style={styles.mainText}>{'Level Passed!'}</Text>
            <Text style={{...styles.secondaryText, marginBottom: 20}}>
              Earned: 18 worms
            </Text>
          </View>

          <View style={{alignItems: 'center', gap: 13}}>
            <TouchableOpacity
              style={styles.playBtnContainer}
              onPress={() => {
                navigation.navigate('Lvl6'),
                  setIsVisible(false),
                  setCurrentIdx(prev => prev + 1);
              }}>
              <Text style={styles.secondaryText}>Next Level</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => unlockLevel()}>
              <Text style={styles.secondaryText}>Back home</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      )}

      {isVisible && (
        <CustomModal visible={isVisible}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 175,
                height: 175,
                backgroundColor: 'rgba(253, 164, 0, 1)',
                borderRadius: 99,
              }}>
              <Image
                source={require('../../../assets/images/modalRooster.png')}
              />
            </View>

            <Text style={styles.mainText}>{'Game Over :('}</Text>
            <Text style={{...styles.secondaryText, marginBottom: 20}}>
              You`ve catched the bomb
            </Text>
          </View>

          <View style={{alignItems: 'center', gap: 13}}>
            <TouchableOpacity
              style={styles.playBtnContainer}
              onPress={() => unlockLevel()}>
              <Text style={styles.secondaryText}>Try again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeTab'), setIsVisible(false);
                if (bestTime < timeLeft) {
                  setBestTime(timeLeft);
                }
                setBalance(prev => prev + 18);
                setLevels(unlockLevel);
                stopTimer();
              }}>
              <Text style={styles.secondaryText}>Back home</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 450,
  },
  mainText: {
    fontFamily: 'Chango-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#272727',
    marginBottom: 15,
    marginTop: 20,
  },
  gameContainer: {
    backgroundColor: '#439638',
    height: 600,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    borderTopRightRadius: 52,
    borderTopLeftRadius: 52,
  },
  secondaryText: {
    fontFamily: 'Chango-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#272727',
  },

  rulesContainer: {
    backgroundColor: '#FFE88D',
    borderWidth: 5,
    borderColor: '#E9BB67',
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 18,
    borderRadius: 52,
    marginTop: 48,
    // alignItems: 'center',
    gap: 30,
  },
  playBtnContainer: {
    height: 60,
    width: '50%',
    backgroundColor: '#FDA400',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E9BB67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerGlass: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  bgHole: {
    width: 120,
    height: 45,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerWorm: {position: 'absolute', top: 60},
  bgExp: {
    width: 100,
    height: 90,
  },
  title: {
    fontSize: 24,
    marginBottom: 29,
    fontFamily: 'Chango-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#272727',
    marginTop: 90,
  },
  timer: {
    fontFamily: 'Chango-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: '#272727',
  },
  timerContainer: {
    height: 45,
    width: 115,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 220,
  },
  holesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 80,
    flexWrap: 'wrap',
  },
  hole: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  roosterContainer: {position: 'absolute', right: -60, bottom: -130},

  glassesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  glass: {
    width: 70,
    position: 'absolute',
    right: 26,
    bottom: 15.5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  winText: {fontSize: 30, fontWeight: 'bold', color: 'green', marginTop: 20},
});

export default Lvl5;
