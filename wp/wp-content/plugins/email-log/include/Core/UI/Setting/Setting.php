<?php namespace EmailLog\Core\UI\Setting;

defined( 'ABSPATH' ) || exit; // Exit if accessed directly.

/**
 * Email Log Setting.
 * Contains a setting section and a number of fields.
 *
 * @since 2.0.0
 */
abstract class Setting {

	/**
	 * @var \EmailLog\Core\UI\Setting\SettingSection
	 */
	protected $section;

	/**
	 * Set default values for SettingSection.
	 * Further customization can be done by the add-on in the `initialize` method.
	 */
	public function __construct() {
		$this->section = new SettingSection();
		$this->section->fields = $this->get_fields();
		$this->section->callback = array( $this, 'render' );
		$this->section->sanitize_callback = array( $this, 'sanitize' );

		$this->initialize();
	}

	/**
	 * Setup hooks and filters.
	 */
	public function load() {
		add_filter( 'el_setting_sections', array( $this, 'register' ) );
	}

	/**
	 * Register the setting using the filter.
	 *
	 * @param SettingSection[] $sections List of existing SettingSections.
	 *
	 * @return SettingSection[] Modified list of SettingSections.
	 */
	public function register( $sections ) {
		$sections[] = $this->section;

		return $sections;
	}

	/**
	 * Get the value stored in the option.
	 *
	 * @return mixed Stored value.
	 */
	public function get_value() {
		return get_option( $this->section->option_name );
	}

	/**
	 * Customize the SettingSection.
	 *
	 * @return void
	 */
	abstract protected function initialize();

	/**
	 * Get the list of SettingFields.
	 *
	 * @return SettingField[] List of fields for the Setting.
	 */
	abstract protected function get_fields();

	/**
	 * Render the Settings.
	 *
	 * @return void
	 */
	abstract public function render();

	/**
	 * Sanitize the option values.
	 *
	 * @param mixed $values User entered values.
	 *
	 * @return mixed Sanitized values.
	 */
	abstract public function sanitize( $values );
}
