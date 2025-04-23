import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Alert,
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

const Game = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [worms, setWorms] = useState([]);
  const [glasses, setGlasses] = useState({red: 0, pink: 0, yellow: 0});
  const [bomb, setBomb] = useState(false);
  const [timer, setTimer] = useState(60);
  const [roosterPosition, setRoosterPosition] = useState({x: 100, y: 300});
  const {levels, setLevels, setCurrentIdx} = useStore();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  // Timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 60000);
  }, []);

  // Generate worms and bombs on interval
  useEffect(() => {
    const interval = setInterval(() => {
      const newWorms = Array.from({length: 5}).map(() => ({
        id: Math.random(),
        color: ['red', 'pink', 'yellow'][Math.floor(Math.random() * 3)],
        isBomb: Math.random() < 0.2, // 20% chance of being a bomb
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
          prevGlasses[worm.color] <= 2
            ? prevGlasses[worm.color] + 1
            : prevGlasses[worm.color],
      }));
    }
  };

  const isGameWon = Object.values(glasses).every(count => count >= 3);

  const unlockLevel = () => {
    const unlockLevel = levels.map((level, idx) => {
      if (idx === 0) {
        return {
          ...level,
          passed: true,
          locked: false,
        };
      }
      return level;
    });
    setCurrentIdx(prev => prev + 1);
    setLevels(unlockLevel);
    navigation.navigate('HomeTab');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/gameBg.png')}
      style={{...styles.container, filter: isVisible ? 'blur(4)' : null}}>
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
                  color === 'pink' && glasses.pink > 2
                    ? {
                        height: 186,
                      }
                    : {
                        height: 62 * glasses[color],
                      },

                  styles.glass,
                  color === 'yellow' && {
                    backgroundColor: '#F7D22B',
                  },
                  color === 'yellow' && glasses.yellow > 2
                    ? {
                        height: 186,
                      }
                    : {
                        height: 62 * glasses[color],
                      },

                  styles.glass,
                  color === 'red' && {
                    backgroundColor: '#ff6347',
                  },
                  color === 'red' && glasses.red > 2
                    ? {
                        height: 186,
                      }
                    : {
                        height: 62 * glasses[color],
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
            {`00:${timer.toString().padStart(2, '0')}`}
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
          <Image
            source={require('../../../assets/images/rosster1.png')} // Replace with rooster image
          />
        </View>

        {/* {isGameWon && <Text style={styles.winText}>You Win!</Text>} */}
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
              Earned: 9 worms
            </Text>
          </View>

          <View style={{alignItems: 'center', gap: 13}}>
            <TouchableOpacity
              style={styles.playBtnContainer}
              onPress={() => {
                navigation.navigate('Game');
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
  wormText: {fontSize: 18, fontWeight: 'bold'},
  roosterContainer: {position: 'absolute', right: -60, bottom: -130},

  controls: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  glassesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  glass: {
    width: 70,
    // height: 185,
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

export default Game;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
// } from 'react-native';

// const Game = () => {
//   const [worms, setWorms] = useState([]);
//   const [glasses, setGlasses] = useState({red: 0, pink: 0, yellow: 0});
//   const [timer, setTimer] = useState(60);
//   const [roosterPeck, setRoosterPeck] = useState(false);

//   // Timer logic
//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer(prev => Math.max(prev - 1, 0));
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, []);

//   // Generate worms and bombs on interval
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newWorms = Array.from({length: 3}).map(() => ({
//         id: Math.random(),
//         color: ['red', 'pink', 'yellow'][Math.floor(Math.random() * 3)],
//         isBomb: Math.random() < 0.2, // 20% chance of being a bomb
//       }));
//       setWorms(newWorms);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleCatch = worm => {
//     if (worm.isBomb) {
//       // Bomb logic
//       alert('Oops! You caught a bomb!');
//       setGlasses({red: 0, pink: 0, yellow: 0});
//     } else {
//       // Add worm to the correct glass
//       setGlasses(prevGlasses => ({
//         ...prevGlasses,
//         [worm.color]: prevGlasses[worm.color] + 1,
//       }));
//     }

//     // Trigger rooster peck animation
//     setRoosterPeck(true);
//     setTimeout(() => setRoosterPeck(false), 300); // Reset after animation
//   };

//   const isGameWon = Object.values(glasses).every(count => count >= 10);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Catch the Worms!</Text>
//       <Text style={styles.timer}>Time Left: {timer}s</Text>
//       <View style={styles.holesContainer}>
//         {worms.map(worm => (
//           <TouchableOpacity
//             key={worm.id}
//             style={styles.hole}
//             onPress={() => handleCatch(worm)}>
//             <Image
//               source={
//                 worm.isBomb
//                   ? require('../../../assets/images/bomb.png')
//                   : require(`../../../assets/images/red.png`)
//               }
//               style={styles.wormImage}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={styles.roosterContainer}>
//         <Animated.Image
//           source={require('../../../assets/images/rosster1.png')}
//           style={[
//             styles.rooster,
//             roosterPeck && {transform: [{scale: 1.2}]}, // Animation effect
//           ]}
//         />
//       </View>
//       <View style={styles.glassesContainer}>
//         {['red', 'pink', 'yellow'].map(color => (
//           <View key={color} style={[styles.glass, {borderColor: color}]}>
//             <Image
//               source={require(`../../../assets/images/glass.png`)}
//               style={styles.glassImage}
//             />
//             <Text style={styles.glassText}>{glasses[color]}</Text>
//           </View>
//         ))}
//       </View>
//       {isGameWon && <Text style={styles.winText}>You Win!</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
//   title: {fontSize: 24, marginBottom: 20},
//   timer: {fontSize: 18, marginBottom: 10},
//   holesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   hole: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wormImage: {width: 50, height: 50},
//   roosterContainer: {position: 'absolute', bottom: 50},
//   rooster: {width: 60, height: 60},
//   glassesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginTop: 20,
//   },
//   glass: {
//     width: 80,
//     height: 120,
//     borderWidth: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   glassImage: {width: 60, height: 100},
//   glassText: {fontSize: 18, fontWeight: 'bold'},
//   winText: {fontSize: 30, fontWeight: 'bold', color: 'green', marginTop: 20},
// });

// export default Game;
