/**
 * ============================================================================
 * SCORM 2004 4th Edition - Mock API (LMS Simulator)
 * ============================================================================
 * 
 * This script simulates a SCORM 2004 LMS (API_1484_11) so that SCORM content
 * can run standalone (e.g., on GitHub Pages) without a real LMS.
 * 
 * It stores all data in localStorage so progress persists across sessions.
 * 
 * Author: Auto-generated for standalone SCORM deployment
 * ============================================================================
 */

(function () {
    'use strict';

    var STORAGE_KEY = 'scorm_2004_mock_data';
    var MOCK_VERSION = '2';  // Increment to force localStorage reset
    var VERSION_KEY = 'scorm_2004_mock_version';
    var _initialized = false;
    var _terminated = false;
    var _lastError = '0';
    var _data = {};

    // ── Load persisted data from localStorage ──────────────────────────────
    function _loadData() {
        try {
            // If mock version changed, wipe old data to prevent stale issues
            var storedVersion = localStorage.getItem(VERSION_KEY);
            if (storedVersion !== MOCK_VERSION) {
                console.log('[SCORM Mock] Version changed (' + storedVersion + ' → ' + MOCK_VERSION + '), resetting data.');
                localStorage.removeItem(STORAGE_KEY);
                localStorage.setItem(VERSION_KEY, MOCK_VERSION);
                _data = {};
                return;
            }
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                _data = JSON.parse(stored);
            }
        } catch (e) {
            console.warn('[SCORM Mock] Could not load persisted data:', e);
        }
    }

    // ── Save data to localStorage ──────────────────────────────────────────
    function _saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(_data));
        } catch (e) {
            console.warn('[SCORM Mock] Could not save data:', e);
        }
    }

    // ── Initialize default CMI data model values ───────────────────────────
    function _initDefaults() {
        var defaults = {
            'cmi._version': '1.0',
            'cmi.completion_status': 'unknown',
            'cmi.completion_threshold': '',
            'cmi.credit': 'credit',
            'cmi.entry': 'ab-initio',
            'cmi.exit': '',
            'cmi.launch_data': '{"course_name": "", "level_name": "SENA", "client_id": 1, "client_config": "default", "sco_number": "5001", "unit_name": "English", "product_type": "sena", "lang": "eng"}',
            'cmi.learner_id': 'student_001',
            'cmi.learner_name': 'Student, Demo',
            'cmi.learner_preference.audio_level': '1',
            'cmi.learner_preference.language': '',
            'cmi.learner_preference.delivery_speed': '1',
            'cmi.learner_preference.audio_captioning': '0',
            'cmi.location': '',
            'cmi.max_time_allowed': '',
            'cmi.mode': 'normal',
            'cmi.progress_measure': '',
            'cmi.scaled_passing_score': '',
            'cmi.score.scaled': '',
            'cmi.score.raw': '',
            'cmi.score.min': '',
            'cmi.score.max': '',
            'cmi.session_time': 'PT0H0M0S',
            'cmi.success_status': 'unknown',
            'cmi.suspend_data': '',
            'cmi.time_limit_action': '',
            'cmi.total_time': 'PT0H0M0S',

            // Interactions
            'cmi.interactions._count': '0',

            // Objectives (pre-populated from imsmanifest.xml)
            'cmi.objectives._count': '9',
            'cmi.objectives.0.id': 'primary',
            'cmi.objectives.0.score.scaled': '',
            'cmi.objectives.0.score.raw': '',
            'cmi.objectives.0.score.min': '',
            'cmi.objectives.0.score.max': '',
            'cmi.objectives.0.success_status': 'unknown',
            'cmi.objectives.0.completion_status': 'unknown',
            'cmi.objectives.0.description': '',
            'cmi.objectives.1.id': 'secondary_1',
            'cmi.objectives.1.success_status': 'unknown',
            'cmi.objectives.1.completion_status': 'unknown',
            'cmi.objectives.1.score.scaled': '',
            'cmi.objectives.1.score.raw': '',
            'cmi.objectives.2.id': 'secondary_2',
            'cmi.objectives.2.success_status': 'unknown',
            'cmi.objectives.2.completion_status': 'unknown',
            'cmi.objectives.2.score.scaled': '',
            'cmi.objectives.2.score.raw': '',
            'cmi.objectives.3.id': 'secondary_3',
            'cmi.objectives.3.success_status': 'unknown',
            'cmi.objectives.3.completion_status': 'unknown',
            'cmi.objectives.3.score.scaled': '',
            'cmi.objectives.3.score.raw': '',
            'cmi.objectives.4.id': 'secondary_4',
            'cmi.objectives.4.success_status': 'unknown',
            'cmi.objectives.4.completion_status': 'unknown',
            'cmi.objectives.4.score.scaled': '',
            'cmi.objectives.4.score.raw': '',
            'cmi.objectives.5.id': 'secondary_5',
            'cmi.objectives.5.success_status': 'unknown',
            'cmi.objectives.5.completion_status': 'unknown',
            'cmi.objectives.5.score.scaled': '',
            'cmi.objectives.5.score.raw': '',
            'cmi.objectives.6.id': 'secondary_6',
            'cmi.objectives.6.success_status': 'unknown',
            'cmi.objectives.6.completion_status': 'unknown',
            'cmi.objectives.6.score.scaled': '',
            'cmi.objectives.6.score.raw': '',
            'cmi.objectives.7.id': 'secondary_7',
            'cmi.objectives.7.success_status': 'unknown',
            'cmi.objectives.7.completion_status': 'unknown',
            'cmi.objectives.7.score.scaled': '',
            'cmi.objectives.7.score.raw': '',
            'cmi.objectives.8.id': 'secondary_8',
            'cmi.objectives.8.success_status': 'unknown',
            'cmi.objectives.8.completion_status': 'unknown',
            'cmi.objectives.8.score.scaled': '',
            'cmi.objectives.8.score.raw': '',

            // Comments from learner
            'cmi.comments_from_learner._count': '0',

            // Comments from LMS
            'cmi.comments_from_lms._count': '0'
        };

        for (var key in defaults) {
            if (defaults.hasOwnProperty(key) && typeof _data[key] === 'undefined') {
                _data[key] = defaults[key];
            }
        }

        // Force-ensure objectives are always populated (fixes stale localStorage)
        if (!_data['cmi.objectives.0.id'] || _data['cmi.objectives._count'] === '0') {
            for (var objKey in defaults) {
                if (defaults.hasOwnProperty(objKey) && objKey.indexOf('cmi.objectives') === 0) {
                    _data[objKey] = defaults[objKey];
                }
            }
        }
    }

    // ── Error descriptions ─────────────────────────────────────────────────
    var _errors = {
        '0': 'No Error',
        '101': 'General Exception',
        '102': 'General Initialization Failure',
        '103': 'Already Initialized',
        '104': 'Content Instance Terminated',
        '111': 'General Termination Failure',
        '112': 'Termination Before Initialization',
        '113': 'Termination After Termination',
        '122': 'Retrieve Data Before Initialization',
        '123': 'Retrieve Data After Termination',
        '132': 'Store Data Before Initialization',
        '133': 'Store Data After Termination',
        '142': 'Commit Before Initialization',
        '143': 'Commit After Termination',
        '201': 'General Argument Error',
        '301': 'General Get Failure',
        '351': 'General Set Failure',
        '391': 'General Commit Failure',
        '401': 'Undefined Data Model Element',
        '402': 'Unimplemented Data Model Element',
        '403': 'Data Model Element Value Not Initialized',
        '404': 'Data Model Element Is Read Only',
        '405': 'Data Model Element Is Write Only',
        '406': 'Data Model Element Type Mismatch',
        '407': 'Data Model Element Value Out Of Range',
        '408': 'Data Model Dependency Not Established'
    };

    // ── Read-only elements ─────────────────────────────────────────────────
    var _readOnlyElements = [
        'cmi._version',
        'cmi.completion_threshold',
        'cmi.credit',
        'cmi.entry',
        'cmi.launch_data',
        'cmi.learner_id',
        'cmi.learner_name',
        'cmi.max_time_allowed',
        'cmi.mode',
        'cmi.scaled_passing_score',
        'cmi.time_limit_action',
        'cmi.total_time'
    ];

    // ── The Mock API_1484_11 Object ────────────────────────────────────────
    var API_1484_11 = {

        Initialize: function (param) {
            console.log('[SCORM Mock] Initialize("' + param + '")');

            if (_initialized && !_terminated) {
                _lastError = '103';
                return 'false';
            }

            _loadData();
            _initDefaults();
            _initialized = true;
            _terminated = false;
            _lastError = '0';

            // Track session start time
            _data['_session_start'] = new Date().getTime();

            _saveData();
            return 'true';
        },

        Terminate: function (param) {
            console.log('[SCORM Mock] Terminate("' + param + '")');

            if (!_initialized) {
                _lastError = '112';
                return 'false';
            }

            if (_terminated) {
                _lastError = '113';
                return 'false';
            }

            // Calculate session time
            if (_data['_session_start']) {
                var elapsed = new Date().getTime() - _data['_session_start'];
                _data['cmi.session_time'] = _msToScormTime(elapsed);
            }

            // Update entry for next session
            if (_data['cmi.exit'] === 'suspend') {
                _data['cmi.entry'] = 'resume';
            } else {
                _data['cmi.entry'] = '';
            }

            _terminated = true;
            _initialized = false;
            _lastError = '0';
            _saveData();
            return 'true';
        },

        GetValue: function (element) {
            if (!_initialized) {
                _lastError = '122';
                console.warn('[SCORM Mock] GetValue before Initialize:', element);
                return '';
            }

            if (_terminated) {
                _lastError = '123';
                return '';
            }

            // Handle _count properties for dynamic arrays
            var countMatch = element.match(/^(cmi\.\w+)\._count$/);
            if (countMatch) {
                var val = _data[element] || '0';
                console.log('[SCORM Mock] GetValue("' + element + '") → "' + val + '"');
                _lastError = '0';
                return val;
            }

            // Handle _children  
            if (element.match(/\._children$/)) {
                _lastError = '0';
                return _getChildren(element);
            }

            var value = _data[element];

            if (typeof value === 'undefined') {
                // For array elements like cmi.objectives.0.id check if parent count exists
                var arrayMatch = element.match(/^(cmi\.\w+)\.(\d+)\./);
                if (arrayMatch) {
                    var countKey = arrayMatch[1] + '._count';
                    var index = parseInt(arrayMatch[2], 10);
                    var count = parseInt(_data[countKey] || '0', 10);

                    if (index < count) {
                        // Element exists but hasn't been set yet
                        _lastError = '0';
                        console.log('[SCORM Mock] GetValue("' + element + '") → "" (not set yet)');
                        return '';
                    }
                }

                _lastError = '403';
                console.log('[SCORM Mock] GetValue("' + element + '") → undefined (error 403)');
                return '';
            }

            _lastError = '0';
            console.log('[SCORM Mock] GetValue("' + element + '") → "' + value + '"');
            return String(value);
        },

        SetValue: function (element, value) {
            if (!_initialized) {
                _lastError = '132';
                console.warn('[SCORM Mock] SetValue before Initialize:', element, value);
                return 'false';
            }

            if (_terminated) {
                _lastError = '133';
                return 'false';
            }

            // Check read-only
            for (var i = 0; i < _readOnlyElements.length; i++) {
                if (element === _readOnlyElements[i]) {
                    _lastError = '404';
                    console.warn('[SCORM Mock] SetValue on read-only element:', element);
                    return 'false';
                }
            }

            // Handle _count elements (auto-increment for new array entries)
            var arrayMatch = element.match(/^(cmi\.(?:objectives|interactions|comments_from_learner))\.(\d+)\./);
            if (arrayMatch) {
                var countKey = arrayMatch[1] + '._count';
                var index = parseInt(arrayMatch[2], 10);
                var currentCount = parseInt(_data[countKey] || '0', 10);

                if (index >= currentCount) {
                    _data[countKey] = String(index + 1);
                }
            }

            _data[element] = String(value);
            _lastError = '0';
            console.log('[SCORM Mock] SetValue("' + element + '", "' + value + '")');

            // Auto-save on important changes
            _saveData();
            return 'true';
        },

        Commit: function (param) {
            console.log('[SCORM Mock] Commit("' + param + '")');

            if (!_initialized) {
                _lastError = '142';
                return 'false';
            }

            if (_terminated) {
                _lastError = '143';
                return 'false';
            }

            _saveData();
            _lastError = '0';
            return 'true';
        },

        GetLastError: function () {
            return _lastError;
        },

        GetErrorString: function (errorCode) {
            return _errors[errorCode] || 'Unknown Error';
        },

        GetDiagnostic: function (errorCode) {
            return '[Mock LMS] ' + (_errors[errorCode] || 'No diagnostic available for error: ' + errorCode);
        }
    };

    // ── Helper: Convert milliseconds to SCORM 2004 time format ─────────
    function _msToScormTime(ms) {
        var hours = Math.floor(ms / 3600000);
        ms -= hours * 3600000;
        var minutes = Math.floor(ms / 60000);
        ms -= minutes * 60000;
        var seconds = Math.floor(ms / 1000);
        return 'PT' + hours + 'H' + minutes + 'M' + seconds + 'S';
    }

    // ── Helper: Return children for data model elements ────────────────
    function _getChildren(element) {
        var childrenMap = {
            'cmi._children': 'completion_status,credit,entry,exit,interactions,launch_data,learner_id,learner_name,learner_preference,location,max_time_allowed,mode,objectives,progress_measure,scaled_passing_score,score,session_time,success_status,suspend_data,time_limit_action,total_time',
            'cmi.score._children': 'scaled,raw,min,max',
            'cmi.objectives._children': 'id,score,success_status,completion_status,description',
            'cmi.interactions._children': 'id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,latency,description',
            'cmi.learner_preference._children': 'audio_level,language,delivery_speed,audio_captioning'
        };

        // Normalize the element name (remove numbers from array references)
        var normalized = element.replace(/\.\d+\./g, '.');
        return childrenMap[normalized] || '';
    }

    // ── Expose the API globally ────────────────────────────────────────────
    // SCORM 2004 looks for API_1484_11 on the window
    window.API_1484_11 = API_1484_11;

    // Also expose as API for SCORM 1.2 compatibility wrappers that look for window.API
    // Map SCORM 1.2 calls to 2004 equivalents
    window.API = {
        LMSInitialize: function (param) { return API_1484_11.Initialize(param); },
        LMSFinish: function (param) { return API_1484_11.Terminate(param); },
        LMSGetValue: function (element) { return API_1484_11.GetValue(element); },
        LMSSetValue: function (element, value) { return API_1484_11.SetValue(element, value); },
        LMSCommit: function (param) { return API_1484_11.Commit(param); },
        LMSGetLastError: function () { return API_1484_11.GetLastError(); },
        LMSGetErrorString: function (errorCode) { return API_1484_11.GetErrorString(errorCode); },
        LMSGetDiagnostic: function (errorCode) { return API_1484_11.GetDiagnostic(errorCode); }
    };

    console.log('%c[SCORM Mock API] ✅ SCORM 2004 Mock LMS loaded successfully!', 'color: #00c853; font-weight: bold; font-size: 14px;');
    console.log('%c[SCORM Mock API] 📦 Data is stored in localStorage under key: "' + STORAGE_KEY + '"', 'color: #2196f3; font-size: 12px;');

})();
