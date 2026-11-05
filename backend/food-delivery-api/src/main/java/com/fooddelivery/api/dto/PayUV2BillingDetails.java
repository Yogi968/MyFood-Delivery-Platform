package com.fooddelivery.api.dto;

/**
 * Represents customer billing information required by PayU v2.
 */
public class PayUV2BillingDetails {

    private String firstName;

    private String lastName;

    private String address1;

    private String address2;

    private String phone;

    private String email;

    private String city;

    private String state;

    private String country;

    private String zipCode;

    /**
     * Returns the customer's first name.
     *
     * @return first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the customer's first name.
     *
     * @param firstName first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Returns the customer's last name.
     *
     * @return last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the customer's last name.
     *
     * @param lastName last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Returns the primary billing address.
     *
     * @return primary address
     */
    public String getAddress1() {
        return address1;
    }

    /**
     * Sets the primary billing address.
     *
     * @param address1 primary address
     */
    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    /**
     * Returns the secondary billing address.
     *
     * @return secondary address
     */
    public String getAddress2() {
        return address2;
    }

    /**
     * Sets the secondary billing address.
     *
     * @param address2 secondary address
     */
    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    /**
     * Returns the customer's phone number.
     *
     * @return phone number
     */
    public String getPhone() {
        return phone;
    }

    /**
     * Sets the customer's phone number.
     *
     * @param phone phone number
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * Returns the customer's email address.
     *
     * @return email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the customer's email address.
     *
     * @param email email address
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Returns the billing city.
     *
     * @return city
     */
    public String getCity() {
        return city;
    }

    /**
     * Sets the billing city.
     *
     * @param city billing city
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Returns the billing state.
     *
     * @return state
     */
    public String getState() {
        return state;
    }

    /**
     * Sets the billing state.
     *
     * @param state billing state
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * Returns the billing country.
     *
     * @return country
     */
    public String getCountry() {
        return country;
    }

    /**
     * Sets the billing country.
     *
     * @param country billing country
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * Returns the billing postal code.
     *
     * @return postal code
     */
    public String getZipCode() {
        return zipCode;
    }

    /**
     * Sets the billing postal code.
     *
     * @param zipCode postal code
     */
    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}